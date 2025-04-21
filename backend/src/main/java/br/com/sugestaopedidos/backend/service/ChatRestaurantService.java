package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.client.ConsumeOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.dto.ChatRestaurantDto;
import br.com.sugestaopedidos.backend.dto.ContentRestaurantDto;
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
import br.com.sugestaopedidos.backend.util.AuthUtils;
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
    public class ChatRestaurantService {

        private final RestaurantRepository restaurantRepository;
        private final CategoryRepository categoryRepository;
        private final ConsumeOpenAi consumeOpenAi;
        private final RestaurantMapper restaurantMapper;
        private final ObjectMapper objectMapper;
        private final UserRepository userRepository;

        public List<ChatRestaurantDto> consumeChatRestaurant(List<ChatRestaurantDto> chatDtos) {
            User user = AuthUtils.getCurrentUser();

            RequestOpenAi requestOpenAi = createRequest(chatDtos, user);

            ResponseOpenAi responseOpenAi = consumeOpenAi.consumeOpenAi(requestOpenAi).block();
            log.info("Request: {}", requestOpenAi);
            log.info("Response: {}", responseOpenAi);

            if (responseOpenAi == null) {
                throw new RuntimeException("Falha ao obter resposta do OpenAI");
            }

            return processResponse(responseOpenAi, chatDtos);
        }

        private RequestOpenAi createRequest(List<ChatRestaurantDto> chatRequestDtos, User user) {
            String restaurantsStringFormat = formatRestaurants();
            RequestOpenAi requestOpenAi = RequestOpenAi.REQUEST_RESTAURANT(new Message(Role.system, restaurantsStringFormat));

            if (user.getProfile() != null && !user.getProfile().isBlank()) {
                requestOpenAi.getMessages().add(new Message(Role.system,
                        "Este é o perfil atualizado do cliente com base em interações anteriores: " + user.getProfile()));
            }

            requestOpenAi.getMessages().addAll(chatRequestDtos.stream().map(ChatRestaurantDto::getMessage).toList());
            return requestOpenAi;
        }

        private List<ChatRestaurantDto> processResponse(ResponseOpenAi responseOpenAi, List<ChatRestaurantDto> chatRequestDtos) {

            ContentRestaurantDto contentDto;

            try {
                contentDto = objectMapper.readValue(responseOpenAi.getChoices().getFirst().getMessage().getContent(), ContentRestaurantDto.class);
            } catch (JsonProcessingException e) {
                throw new ChatProcessingException(e.getMessage());
            }

            RestaurantResponseDto restaurantResponseDto = null;

            if (!contentDto.getRestaurantName().isBlank() && !contentDto.getRestaurantName().equals("N/A")) {
                restaurantResponseDto = restaurantMapper.toDto(
                        restaurantRepository.findByName(contentDto.getRestaurantName())
                                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + contentDto.getRestaurantName())));
            }
            chatRequestDtos.add(new ChatRestaurantDto(responseOpenAi.getChoices().getFirst().getMessage(), restaurantResponseDto));

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

    }

