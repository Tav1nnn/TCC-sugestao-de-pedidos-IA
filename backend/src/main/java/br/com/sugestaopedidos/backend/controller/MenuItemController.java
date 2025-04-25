package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.CategoryResponseDto;
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

@RestController
@RequestMapping("api/menuItem")
@RequiredArgsConstructor
public class MenuItemController {
    private final MenuItemService menuItemService;

    @GetMapping("/{id}")
    public MenuItemHomeDto consultOpenAi(@PathVariable String id) {
        return menuItemService.getMenu(id);
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
}
