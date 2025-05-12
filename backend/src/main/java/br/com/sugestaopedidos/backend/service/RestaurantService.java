package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.PutRestaurantRequestDto;
import br.com.sugestaopedidos.backend.dto.RestaurantRequestDto;
import br.com.sugestaopedidos.backend.dto.RestaurantResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.RestaurantMapper;
import br.com.sugestaopedidos.backend.model.Restaurant;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.RestaurantRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantMapper restaurantMapper;

    private static ResourceNotFoundException getResourceNotFoundException(String id) {
        return new ResourceNotFoundException(id);
    }

    public Set<RestaurantResponseDto> findAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(restaurantMapper::toDto)
                .collect(Collectors.toSet());
    }

    public RestaurantResponseDto findByIdRestaurants(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> getResourceNotFoundException(id));

        return restaurantMapper.toDto(restaurant);
    }

    public RestaurantResponseDto createRestaurant(RestaurantRequestDto restaurantRequestDto) {
        Restaurant restaurant = restaurantMapper.toEntity(restaurantRequestDto);
        restaurant = restaurantRepository.save(restaurant);
        return restaurantMapper.toDto(restaurant);
    }

    public void updateRestaurant(PutRestaurantRequestDto restaurantRequestDto) {
        User user = AuthUtils.getCurrentUser();

        Restaurant restaurant = restaurantRepository.findById(user.getRestaurant().getId())
                .orElseThrow(() -> getResourceNotFoundException(user.getRestaurant().getId()));

        restaurantMapper.updateEntityFromRequest(restaurant, restaurantRequestDto);

        restaurantRepository.save(restaurant);
    }

    public void delete(String id) {
        if (!restaurantRepository.existsById(id)) throw getResourceNotFoundException(id);

        restaurantRepository.deleteById(id);
    }
}
