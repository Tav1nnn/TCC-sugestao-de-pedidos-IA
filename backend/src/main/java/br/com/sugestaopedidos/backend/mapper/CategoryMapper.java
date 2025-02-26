package br.com.sugestaopedidos.backend.mapper;

import br.com.sugestaopedidos.backend.dto.CategoryRequestDto;
import br.com.sugestaopedidos.backend.dto.CategoryResponseDto;
import br.com.sugestaopedidos.backend.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(CategoryRequestDto restaurantRequest);

    Set<Category> toSetEntities(Set<CategoryRequestDto> restaurantRequests);

    CategoryResponseDto toDto(Category restaurant);

    Set<CategoryResponseDto> toSetDtos(Set<Category> restaurants);

    void updateEntityFromRequest(@MappingTarget Category restaurant, CategoryRequestDto restaurantRequestDto);
}
