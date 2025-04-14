package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.client.ConsumeOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.dto.ChatMenuItemDto;
import br.com.sugestaopedidos.backend.dto.ContentMenuItemDto;
import br.com.sugestaopedidos.backend.dto.MenuItemResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.ChatProcessingException;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.CategoryMapper;
import br.com.sugestaopedidos.backend.mapper.IngredientMapper;
import br.com.sugestaopedidos.backend.mapper.RestaurantMapper;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.MenuItemRepository;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;
    private final ObjectMapper objectMapper;
    private final ConsumeOpenAi consumeOpenAi;
    private final IngredientMapper ingredientMapper;
    private final CategoryMapper categoryMapper;
    private final RestaurantMapper restaurantMapper;
    private Restaurant restaurant;

    public List<ChatMenuItemDto> consumeChatMenuItem(List<ChatMenuItemDto> chatDtos, String restaurantId) {
        User user = AuthUtils.getCurrentUser();
        this.restaurant = getRestaurant(restaurantId);

        RequestOpenAi requestOpenAi = createRequest(chatDtos, user);

        ResponseOpenAi responseOpenAi = consumeOpenAi.consumeOpenAi(requestOpenAi).block();
        log.info("Request: {}", requestOpenAi);
        log.info("Response: {}", responseOpenAi);

        if (responseOpenAi == null) {
            throw new RuntimeException("Falha ao obter resposta do OpenAI");
        }

        return processResponse(responseOpenAi, chatDtos);
    }

    private List<ChatMenuItemDto> processResponse(ResponseOpenAi responseOpenAi, List<ChatMenuItemDto> chatDtos) {
        ContentMenuItemDto contentMenuItemDto;

        try {
            contentMenuItemDto = objectMapper.readValue(responseOpenAi.getChoices().getFirst().getMessage().getContent(), ContentMenuItemDto.class);
        } catch (JsonProcessingException e) {
            throw new ChatProcessingException(e.getMessage());
        }

        MenuItem menuItem = null;

        if(
                contentMenuItemDto.getDishesName() != null &&
                !contentMenuItemDto.getDishesName().isBlank() &&
                !contentMenuItemDto.getDishesName().equals("N/A")
        ) {
            menuItem = menuItemRepository.findMenuItemByRestaurantAndName(this.restaurant, contentMenuItemDto.getDishesName());
        }

        List<MenuItem> menuItemList = new ArrayList<>();

        if(!contentMenuItemDto.getSides().isEmpty() && !contentMenuItemDto.getSides().equals("N/A")) {
            contentMenuItemDto.getSides().forEach(menuItemName -> {
                MenuItem menuItemSides = menuItemRepository.findMenuItemByRestaurantAndName(this.restaurant, menuItemName);

                if(menuItemSides != null) menuItemList.add(menuItemSides);
            });
        }

        ChatMenuItemDto chatMenuItemDto = new ChatMenuItemDto();
        chatMenuItemDto.setMessage(responseOpenAi.getChoices().getFirst().getMessage());

        if(menuItem != null) {
            MenuItemResponseDto responseDto = menuItemEntityToDto(menuItem);
            chatMenuItemDto.setMenuItemResponseDto(responseDto);
        }

        if(!menuItemList.isEmpty()){
            List<MenuItemResponseDto> responseDtos = new ArrayList<>();

            menuItemList.forEach(obj -> {
                responseDtos.add(menuItemEntityToDto(obj));
            });
            chatMenuItemDto.setSides(responseDtos);
        }

        chatDtos.add(chatMenuItemDto);

        return chatDtos;
    }

    private RequestOpenAi createRequest(List<ChatMenuItemDto> chatDtos, User user) {
        String menuItemStringFormat = formatMenuItems();
        String restaurantFormat = formatRestaurant();
        RequestOpenAi requestOpenAi = RequestOpenAi.REQUEST_MENU_ITEM(new Message(Role.system, menuItemStringFormat));
        requestOpenAi.getMessages().add(new Message(Role.system, restaurantFormat));

        if(user.getProfile() != null && !user.getProfile().isBlank()) {
            requestOpenAi.getMessages().add(new Message(Role.system,
                    "Este é o perfil atualizado do cliente com base em interações anteriores: " + user.getProfile()));
        }

        requestOpenAi.getMessages().addAll(chatDtos.stream().map(ChatMenuItemDto::getMessage).toList());
        return requestOpenAi;
    }

    private String formatRestaurant() {
        return "Restaurante em questão: " + restaurant.toString();
    }

    private String formatMenuItems() {

        List<MenuItem> menuItems = menuItemRepository.findMenuItemByRestaurant(this.restaurant);

        StringJoiner joiner = new StringJoiner(", ", "Segue a lista de pratos: ", ".");
        menuItems.forEach(menuItem -> joiner.add(menuItem.toString()));

        return joiner.toString();
    }

    private Restaurant getRestaurant(String restaurantId) {
        return restaurantRepository.findById(restaurantId).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found: " + restaurantId));
    }

    private MenuItemResponseDto menuItemEntityToDto(MenuItem menuItem){
        MenuItemResponseDto menuItemResponseDto = new MenuItemResponseDto();
        menuItemResponseDto.setId(menuItem.getId());
        menuItemResponseDto.setName(menuItem.getName());
        menuItemResponseDto.setDescription(menuItem.getDescription());
        menuItemResponseDto.setPrice(menuItem.getPrice());
        menuItemResponseDto.setImageURL(menuItem.getImageURL());
        menuItemResponseDto.setRestaurant(restaurantMapper.toDto(menuItem.getRestaurant()));
        menuItemResponseDto.setCategory(categoryMapper.toDto(menuItem.getCategory()));
        menuItemResponseDto.setIngredients(ingredientMapper.toSetDtos(menuItem.getIngredients()));
        menuItemResponseDto.setCreatedAt(menuItem.getCreatedAt());
        menuItemResponseDto.setUpdatedAt(menuItem.getUpdatedAt());

        return menuItemResponseDto;
    }
}
