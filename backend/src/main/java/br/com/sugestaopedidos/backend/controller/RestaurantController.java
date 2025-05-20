package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.PutRestaurantRequestDto;
import br.com.sugestaopedidos.backend.dto.RestaurantRequestDto;
import br.com.sugestaopedidos.backend.dto.RestaurantResponseDto;
import br.com.sugestaopedidos.backend.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Set;

@RestController
@RequestMapping("api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<Set<RestaurantResponseDto>> getAllRestaurants() {
        Set<RestaurantResponseDto> response = restaurantService.findAllRestaurants();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantResponseDto> getByIdRestaurant(@PathVariable String id) {
        return ResponseEntity.ok(restaurantService.findByIdRestaurants(id));
    }

    @PostMapping
    public ResponseEntity<Void> createRestaurant(@Valid @RequestBody RestaurantRequestDto request) {
        RestaurantResponseDto restaurantResponseDto = restaurantService.createRestaurant(request);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(restaurantResponseDto.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRestaurant(@Valid @RequestBody PutRestaurantRequestDto restaurantRequestDto, @PathVariable String id) {
        restaurantService.updateRestaurant(restaurantRequestDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable String id) {
        restaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
