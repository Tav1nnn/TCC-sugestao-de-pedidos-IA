package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.MenuItemResponseDto;
import br.com.sugestaopedidos.backend.dto.MenuItemRequestDto;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.MenuItemMapper;
import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.dto.MenuItemHomeDto;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import br.com.sugestaopedidos.backend.repository.CategoryRepository;
import br.com.sugestaopedidos.backend.repository.IngredientRepository;
import br.com.sugestaopedidos.backend.repository.MenuItemRepository;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final IngredientRepository ingredientRepository;
    private final CategoryRepository categoryRepository;
    private final MenuItemMapper menuItemMapper;

    public MenuItemResponseDto createMenuItem(MenuItemRequestDto menuItemResquestDto) {

        MenuItem menuItem = menuItemMapper.toEntity(menuItemResquestDto);

        menuItem.setRestaurant(AuthUtils.getCurrentUser().getRestaurant());

        Set<Ingredient> ingredients = new HashSet<>(
                ingredientRepository.findAllById(menuItemResquestDto.getIngredientIds())
        );
        menuItem.setIngredients(ingredients);

        Category category = categoryRepository.findById(menuItemResquestDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
        menuItem.setCategory(category);

        MenuItem saved = menuItemRepository.save(menuItem);
        return menuItemMapper.toDto(saved);
    }



    public MenuItemHomeDto getMenu(String restaurantId) {
        Restaurant restaurant = restaurantRepository.
                findById(restaurantId).orElseThrow(() -> new ResourceNotFoundException("Restaurant Id not found"));

        List<MenuItem> menuItemList = menuItemRepository.findMenuItemByRestaurant(restaurant);

        Map<String, MenuItemHomeDto.CategoryDto> categotyToMenuItemMap = new HashMap<>();

        for(MenuItem menuItem : menuItemList) {
            String categoryName = menuItem.getCategory().getName();

            if(!categotyToMenuItemMap.containsKey(categoryName)){
                MenuItemHomeDto.CategoryDto categoryDto = new MenuItemHomeDto.CategoryDto();
                categoryDto.setCategory(categoryName);
                categoryDto.setMenuItem(new ArrayList<>());
                categotyToMenuItemMap.put(categoryName, categoryDto);
            }

            MenuItemHomeDto.MenuItemDto menuItemDto = convertToMenuItemDto(menuItem);
            categotyToMenuItemMap.get(categoryName).getMenuItem().add(menuItemDto);
        }

        List<MenuItemHomeDto.CategoryDto> categoryDtoList = new ArrayList<>(categotyToMenuItemMap.values());

        MenuItemHomeDto menuDto = new MenuItemHomeDto();
        menuDto.setMenu(categoryDtoList);

        return menuDto;
    }

    private MenuItemHomeDto.MenuItemDto convertToMenuItemDto(MenuItem menuItem) {
        MenuItemHomeDto.MenuItemDto menuItemDto = new MenuItemHomeDto.MenuItemDto();
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
