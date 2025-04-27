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
import java.util.stream.Collectors;

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
                .orElseThrow(() -> new ResourceNotFoundException(menuItemResquestDto.getCategoryId()));
        menuItem.setCategory(category);

        MenuItem saved = menuItemRepository.save(menuItem);
        return menuItemMapper.toDto(saved);
    }

    public MenuItemResponseDto findByIdMenuItem(String id) {
        MenuItem menuItem = menuItemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));

        return menuItemMapper.toDto(menuItem);
    }

    public List<MenuItemResponseDto> findAll() {
        List<MenuItem> menuItemList = menuItemRepository.findAll();

        return menuItemList.stream()
                .map(menuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public void delete(String id) {
        if(!menuItemRepository.existsById(id)){
            throw new ResourceNotFoundException("Id not found: " + id);
        }

        menuItemRepository.deleteById(id);
    }

    public MenuItemHomeDto getMenu(String restaurantId) {
        Restaurant restaurant = restaurantRepository
                .findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException(restaurantId));

        List<MenuItem> menuItemList = menuItemRepository.findMenuItemByRestaurant(restaurant);

        Map<String, MenuItemHomeDto.CategoryDto> categoryToMenuItemMap = new HashMap<>();

        for (MenuItem menuItem : menuItemList) {
            String categoryName = menuItem.getCategory().getName();
            String categoryId = menuItem.getCategory().getId();

            if (!categoryToMenuItemMap.containsKey(categoryId)) {
                MenuItemHomeDto.CategoryDto categoryDto = new MenuItemHomeDto.CategoryDto();
                categoryDto.setCategoryId(categoryId);
                categoryDto.setCategory(categoryName);
                categoryDto.setMenuItem(new ArrayList<>());
                categoryToMenuItemMap.put(categoryId, categoryDto);
            }

            MenuItemHomeDto.MenuItemDto menuItemDto = convertToMenuItemDto(menuItem);
            categoryToMenuItemMap.get(categoryId).getMenuItem().add(menuItemDto);
        }

        List<MenuItemHomeDto.CategoryDto> categoryDtoList = new ArrayList<>(categoryToMenuItemMap.values());

        MenuItemHomeDto menuDto = new MenuItemHomeDto();
        menuDto.setMenu(categoryDtoList);

        return menuDto;
    }

    public void updateMenuItem(MenuItemRequestDto menuItemResquestDto, String id) {

        if(!menuItemRepository.existsById(id)){
            throw new ResourceNotFoundException(id);
        }

        MenuItem menuItem = menuItemMapper.toEntity(menuItemResquestDto);
        menuItem.setId(id);

        menuItem.setRestaurant(AuthUtils.getCurrentUser().getRestaurant());

        Set<Ingredient> ingredients = new HashSet<>(
                ingredientRepository.findAllById(menuItemResquestDto.getIngredientIds())
        );
        menuItem.setIngredients(ingredients);

        Category category = categoryRepository.findById(menuItemResquestDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(menuItemResquestDto.getCategoryId()));
        menuItem.setCategory(category);

        menuItemRepository.save(menuItem);
    }

    private MenuItemHomeDto.MenuItemDto convertToMenuItemDto(MenuItem menuItem) {
        MenuItemHomeDto.MenuItemDto menuItemDto = new MenuItemHomeDto.MenuItemDto();
        menuItemDto.setMenuItemId(menuItem.getId());
        menuItemDto.setName(menuItem.getName());
        menuItemDto.setImageUrl(menuItem.getImageURL());
        menuItemDto.setPrice(menuItem.getPrice());
        menuItemDto.setIngredients(extractIngredientDtos(menuItem.getIngredients()));
        return menuItemDto;
    }

    private List<MenuItemHomeDto.IngredientsDto> extractIngredientDtos(Set<Ingredient> ingredients) {
        List<MenuItemHomeDto.IngredientsDto> ingredientDtoList = new ArrayList<>();
        for (Ingredient ingredient : ingredients) {
            MenuItemHomeDto.IngredientsDto ingredientDto = new MenuItemHomeDto.IngredientsDto();
            ingredientDto.setIngredientId(ingredient.getId());
            ingredientDto.setIngredient(ingredient.getName());
            ingredientDtoList.add(ingredientDto);
        }
        return ingredientDtoList;
    }

 }
