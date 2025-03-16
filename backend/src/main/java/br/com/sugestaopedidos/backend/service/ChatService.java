package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.client.ConsumeOpenAi;
import br.com.sugestaopedidos.backend.client.Scripts;
import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.dto.ChatDto;
import br.com.sugestaopedidos.backend.dto.ContentDto;
import br.com.sugestaopedidos.backend.dto.RestaurantFormatDto;
import br.com.sugestaopedidos.backend.dto.RestaurantResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.ChatProcessingException;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.RestaurantMapper;
import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Restaurant;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.CategoryRepository;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
import br.com.sugestaopedidos.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
    @Service
    @Slf4j
    @RequiredArgsConstructor
    public class ChatService {

        private final RestaurantRepository restaurantRepository;
        private final CategoryRepository categoryRepository;
        private final ConsumeOpenAi consumeOpenAi;
        private final RestaurantMapper restaurantMapper;
        private final ObjectMapper objectMapper;
        private final UserRepository userRepository;

        public List<ChatDto> consumeChatRestaurant(List<ChatDto> chatDtos, String userId) {
            RequestOpenAi requestOpenAi = createRequest(chatDtos, userId);

            ResponseOpenAi responseOpenAi = consumeOpenAi.consuteOpenAi(requestOpenAi).block();
            log.info("Request: {}", requestOpenAi);
            log.info("Response: {}", responseOpenAi);

            if (responseOpenAi == null) {
                throw new RuntimeException("Falha ao obter resposta do OpenAI");
            }

            return processResponse(responseOpenAi, chatDtos);
        }

        private RequestOpenAi createRequest(List<ChatDto> chatRequestDtos, String userId) {
            RequestOpenAi requestOpenAi = new RequestOpenAi();
            requestOpenAi.getMessages().addAll(List.of( //adiciona os scripts
                    Scripts.SCRIPT_RESTAURANT,
                    Scripts.RETURN_FORMAT,
                    new Message(Role.system, formatRestaurants())
            ));// metodo de instanciacao
            //adiciona conversas anteriores

            String profile = getUserProfile(userId);

            if(profile != null){
                requestOpenAi.getMessages().add(new Message(Role.system, "Aqui estáo um pouco do perfil do cliente: " + profile));
            }

            requestOpenAi.getMessages().addAll(chatRequestDtos.stream().map(ChatDto::getMessage).toList());
            return requestOpenAi;
        }

        private List<ChatDto> processResponse(ResponseOpenAi responseOpenAi, List<ChatDto> chatRequestDtos) {

            ContentDto contentDto;

            try {
                contentDto = objectMapper.readValue(responseOpenAi.getChoices().getFirst().getMessage().getContent(), ContentDto.class);
            } catch (JsonProcessingException e) {
                throw new ChatProcessingException(e.getMessage());
            }

            RestaurantResponseDto restaurantResponseDto = null;

            System.out.println(contentDto.getRestaurantName());
            if (!contentDto.getRestaurantName().isBlank() && !contentDto.getRestaurantName().equals("N/A")) {
                restaurantResponseDto = restaurantMapper.toDto(
                        restaurantRepository.findByName(contentDto.getRestaurantName())
                                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + contentDto.getRestaurantName())));
            }
            chatRequestDtos.add(new ChatDto(responseOpenAi.getChoices().getFirst().getMessage(), restaurantResponseDto));

            return chatRequestDtos;
        }

        private String formatRestaurants() {
            List<Restaurant> restaurants = restaurantRepository.findAll();
            List<RestaurantFormatDto> restaurantFormatDtos = restaurantMapper.toListDtos(restaurants);
            List<Category> categories = categoryRepository.findByRestaurants(restaurants);

            Map<String, RestaurantFormatDto> restaurantMap = new HashMap<>();
            for (int i = 0; i < restaurants.size(); i++) {
                Restaurant restaurant = restaurants.get(i);
                RestaurantFormatDto dto = restaurantFormatDtos.get(i);
                restaurantMap.put(restaurant.getId(), dto);
            }

            for (Category category : categories) {
                Restaurant restaurant = category.getRestaurant();
                RestaurantFormatDto dto = restaurantMap.get(restaurant.getId());
                if (dto != null) {
                    dto.getCategories().add(category.getName());
                }
            }

            StringJoiner joiner = new StringJoiner(", ", "Segue a lista de restaurantes: ", ".");
            restaurantFormatDtos.forEach(dto -> joiner.add(dto.toString().replace("RestaurantFormatDto", "")));

            return joiner.toString();

        }

        private String getUserProfile(String userId) {
            User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not fount id: " + userId));
            return user.getProfile() != null ? user.getProfile() : null;

        }
    }

