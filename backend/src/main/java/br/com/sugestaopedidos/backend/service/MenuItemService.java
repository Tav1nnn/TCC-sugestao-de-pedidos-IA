package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.model.MenuDto;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import br.com.sugestaopedidos.backend.repository.MenuItemRepository;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;
    public MenuDto getMenu(String restaurantId) {
        Restaurant restaurant = restaurantRepository.
                findById(restaurantId).orElseThrow(() -> new ResourceNotFoundException("Restaurant Id not found"));

        List<MenuItem> menuItemList = menuItemRepository.findMenuItemByRestaurant(restaurant);

        Map<String, MenuDto.CategoryDto> categotyToMenuItemMap = new HashMap<>();

        for(MenuItem menuItem : menuItemList) {
            String categoryName = menuItem.getCategory().getName();

            if(!categotyToMenuItemMap.containsKey(categoryName)){
                MenuDto.CategoryDto categoryDto = new MenuDto.CategoryDto();
                categoryDto.setCategory(categoryName);
                categoryDto.setMenuItem(new ArrayList<>());
                categotyToMenuItemMap.put(categoryName, categoryDto);
            }

            MenuDto.MenuItemDto menuItemDto = convertToMenuItemDto(menuItem);
            categotyToMenuItemMap.get(categoryName).getMenuItem().add(menuItemDto);
        }

        List<MenuDto.CategoryDto> categoryDtoList = new ArrayList<>(categotyToMenuItemMap.values());

        MenuDto menuDto = new MenuDto();
        menuDto.setMenu(categoryDtoList);

        return menuDto;
    }

    private MenuDto.MenuItemDto convertToMenuItemDto(MenuItem menuItem) {
        MenuDto.MenuItemDto menuItemDto = new MenuDto.MenuItemDto();
        menuItemDto.setName(menuItem.getName());
        menuItemDto.setImageUrl(menuItem.getImageURL());
        menuItemDto.setPrice(menuItem.getPrice());
        menuItemDto.setIngredients(extractIngredientNames(menuItem.getIngredients()));
        return menuItemDto;
    }

    private List<String> extractIngredientNames(Set<Ingredient> ingredients) {
        List<String> ingredientNames = new ArrayList<>();
        for (Ingredient ingredient : ingredients) {
            ingredientNames.add(ingredient.getName());
        }
        return ingredientNames;
    }
 }
