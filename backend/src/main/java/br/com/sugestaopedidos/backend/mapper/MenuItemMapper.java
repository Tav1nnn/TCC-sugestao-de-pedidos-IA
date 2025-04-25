package br.com.sugestaopedidos.backend.mapper;

import br.com.sugestaopedidos.backend.dto.MenuItemResponseDto;
import br.com.sugestaopedidos.backend.dto.MenuItemRequestDto;
import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.model.MenuItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MenuItemMapper {

    @Mapping(target = "restaurant", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    MenuItem toEntity(MenuItemRequestDto dto);

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "restaurantId", source = "restaurant.id")
    @Mapping(target = "ingredientIds", source = "ingredients", qualifiedByName = "extractIngredientIds")
    MenuItemResponseDto toDto(MenuItem entity);

    @Named("extractIngredientIds")
    default Set<String> extractIngredientIds(Set<Ingredient> ingredients) {
        if (ingredients == null) return Collections.emptySet();
        return ingredients.stream().map(Ingredient::getId).collect(Collectors.toSet());
    }
}

