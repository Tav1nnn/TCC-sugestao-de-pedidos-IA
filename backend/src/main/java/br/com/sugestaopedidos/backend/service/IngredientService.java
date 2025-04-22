package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.IngredientRequestDto;
import br.com.sugestaopedidos.backend.dto.IngredientResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.RelatedObjectException;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.IngredientMapper;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.IngredientRepository;
import br.com.sugestaopedidos.backend.repository.MenuItemRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;
    private final MenuItemRepository menuItemRepository;

    public Set<IngredientResponseDto> findAllIngredients() {
        User user = AuthUtils.getCurrentUser();
        return ingredientRepository.findByIsGlobalTrueOrRestaurant(user.getRestaurant()).stream()
                .map(ingredientMapper::toDto)
                .collect(Collectors.toSet());
    }

    public IngredientResponseDto findByIdIngredients(String id) {
        User user = AuthUtils.getCurrentUser();
        Ingredient ingredient = ingredientRepository.findByIdAndRestaurant(id, user.getRestaurant())
                .orElseThrow(() -> getResourceNotFoundException(id));

        return ingredientMapper.toDto(ingredient);
    }

    public IngredientResponseDto createIngredient(IngredientRequestDto ingredientRequestDto) {
        User user = AuthUtils.getCurrentUser();
        Ingredient ingredient = ingredientMapper.toEntity(ingredientRequestDto);
        ingredient.setRestaurant(user.getRestaurant());
        ingredient.setIsGlobal(false);
        ingredient = ingredientRepository.save(ingredient);
        return ingredientMapper.toDto(ingredient);
    }

    public void updateIngredient(String id, IngredientRequestDto ingredientRequestDto) {
        User user = AuthUtils.getCurrentUser();
        Ingredient ingredient = ingredientRepository.findByIdAndRestaurant(id, user.getRestaurant())
                .orElseThrow(() -> getResourceNotFoundException(id));

        ingredientMapper.updateEntityFromRequest(ingredient, ingredientRequestDto);

        ingredientRepository.save(ingredient);
    }

    public void delete(String id) {
        User user = AuthUtils.getCurrentUser();
        if (!ingredientRepository.existsByIdAndRestaurant(id, user.getRestaurant())) throw getResourceNotFoundException(id);

        List<MenuItem> menuItemList = menuItemRepository.findByIngredientsId(id);

        if(!menuItemList.isEmpty()) {
            String ids = menuItemList.stream()
                    .map(MenuItem::getId)
                    .collect(Collectors.joining(","));
            throw new RelatedObjectException("Existem MenuItems relacionado a essa categoria: " + ids);
        }

        ingredientRepository.deleteById(id);
    }

    private static ResourceNotFoundException getResourceNotFoundException(String id) {
        return new ResourceNotFoundException("Ingredient not found with id: " + id);
    }
}
