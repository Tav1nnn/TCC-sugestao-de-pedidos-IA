package br.com.sugestaopedidos.backend.mapper;

import br.com.sugestaopedidos.backend.dto.RestaurantFormatDto;
import br.com.sugestaopedidos.backend.dto.RestaurantRequestDto;
import br.com.sugestaopedidos.backend.dto.RestaurantResponseDto;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface RestaurantMapper {

    Restaurant toEntity(RestaurantRequestDto restaurantRequest);

    Set<Restaurant> toSetEntities(Set<RestaurantRequestDto> restaurantRequests);

    RestaurantResponseDto toDto(Restaurant restaurant);

    RestaurantFormatDto toFormatDto(Restaurant restaurant);

    List<RestaurantFormatDto> toListDtos(List<Restaurant> restaurants);

    void updateEntityFromRequest(@MappingTarget Restaurant restaurant, RestaurantRequestDto restaurantRequestDto);
}
