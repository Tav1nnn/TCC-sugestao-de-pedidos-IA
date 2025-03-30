package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.ChatDto;
import br.com.sugestaopedidos.backend.model.MenuDto;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.service.ChatService;
import br.com.sugestaopedidos.backend.service.MenuItemService;
import br.com.sugestaopedidos.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/menuItem")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class MenuItemController {
    private final MenuItemService menuItemService;

    @GetMapping("/{id}")
    public MenuDto consultOpenAi(@PathVariable String id) {
        return menuItemService.getMenu(id);
    }
}
