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
import br.com.sugestaopedidos.backend.repository.CategoryRepository;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
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

        public List<ChatDto> consumeChatRestaurant(List<ChatDto> chatDtos){
            RequestOpenAi requestOpenAi = createRequest(chatDtos);

            ResponseOpenAi responseOpenAi = consumeOpenAi.consuteOpenAi(requestOpenAi).block();
            log.info("Request: {}", requestOpenAi);
            log.info("Response: {}", responseOpenAi);

            if (responseOpenAi == null) {
                throw new RuntimeException("Falha ao obter resposta do OpenAI");
            }


            return processResponse(responseOpenAi, chatDtos);
        }

        private RequestOpenAi createRequest(List<ChatDto> chatRequestDtos) {
            RequestOpenAi requestOpenAi = new RequestOpenAi();
            requestOpenAi.getMessages().addAll(List.of( //adiciona os scripts
                    Scripts.SCRIPT_RESTAURANT,
                    Scripts.ERROR_RESTAURANT,
                    Scripts.RETURN_FORMAT,
                    new Message(Role.system, formatRestaurants())
            ));
            //adiciona conversas anteriores
            requestOpenAi.getMessages().addAll(chatRequestDtos.stream().map(ChatDto::getMessage).toList());
            return requestOpenAi;
        }

        private List<ChatDto> processResponse(ResponseOpenAi responseOpenAi, List<ChatDto> chatRequestDtos){

            ContentDto contentDto;

            try {
                contentDto = objectMapper.readValue(responseOpenAi.getChoices().getFirst().getMessage().getContent(), ContentDto.class);
            } catch (JsonProcessingException e) {
                throw new ChatProcessingException(e.getMessage());
            }

            RestaurantResponseDto restaurantResponseDto = null;

            if(!contentDto.getTitle().equals("USER COM PREFERÊNCIA") && !contentDto.getTitle().equals("NÃO RELACIONADO")) {
                restaurantResponseDto = restaurantMapper.toDto(
                        restaurantRepository.findByName(contentDto.getTitle())
                                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + contentDto.getTitle())));
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

    }
