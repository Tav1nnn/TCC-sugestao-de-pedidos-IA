package br.com.sugestaopedidos.backend.mapper;

import br.com.sugestaopedidos.backend.dto.IngredientRequestDto;
import br.com.sugestaopedidos.backend.dto.IngredientResponseDto;
import br.com.sugestaopedidos.backend.model.Ingredient;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    Ingredient toEntity(IngredientRequestDto ingredientRequest);
    Set<Ingredient> toSetEntities(Set<IngredientRequestDto> ingredientRequests);
    IngredientResponseDto toDto(Ingredient ingredient);
    Set<IngredientResponseDto> toSetDtos(Set<Ingredient> ingredients);
    void updateEntityFromRequest(@MappingTarget Ingredient ingredient, IngredientRequestDto ingredientRequestDto);
}
