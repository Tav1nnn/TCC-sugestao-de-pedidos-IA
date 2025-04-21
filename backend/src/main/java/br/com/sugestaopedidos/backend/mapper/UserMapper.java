package br.com.sugestaopedidos.backend.mapper;

import br.com.sugestaopedidos.backend.dto.UserRequestDto;
import br.com.sugestaopedidos.backend.dto.UserResponseDto;
import br.com.sugestaopedidos.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserRequestDto restaurantRequest);

    Set<User> toSetEntities(Set<UserRequestDto> restaurantRequests);

    UserResponseDto toDto(User restaurant);

    Set<UserResponseDto> toSetDtos(Set<User> restaurants);

    void updateEntityFromRequest(@MappingTarget User restaurant, UserRequestDto restaurantRequestDto);
}
