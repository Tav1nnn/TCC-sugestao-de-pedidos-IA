package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.MenuItemHomeDto;
import br.com.sugestaopedidos.backend.dto.MenuItemRequestDto;
import br.com.sugestaopedidos.backend.dto.MenuItemResponseDto;
import br.com.sugestaopedidos.backend.service.MenuItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/menuItem")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<MenuItemHomeDto> findByRestaurant(@PathVariable String id) {
        MenuItemHomeDto menu = menuItemService.getMenu(id);
        return ResponseEntity.ok(menu);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemResponseDto> findById(@PathVariable String id) {
        MenuItemResponseDto menuItem = menuItemService.findByIdMenuItem(id);
        return ResponseEntity.ok(menuItem);
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponseDto>> findAll() {
        List<MenuItemResponseDto> menuItems = menuItemService.findAll();
        return ResponseEntity.ok(menuItems);
    }

    @PostMapping
    public ResponseEntity<Void> createMenuItem(@Valid @RequestBody MenuItemRequestDto request) {
        MenuItemResponseDto menuItemResponseDto = menuItemService.createMenuItem(request);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(menuItemResponseDto.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable String id) {
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMenuItem(@Valid @RequestBody MenuItemRequestDto menuItemRequestDto, @PathVariable String id) {
        menuItemService.updateMenuItem(menuItemRequestDto, id);
        return ResponseEntity.ok().build();
    }
}
