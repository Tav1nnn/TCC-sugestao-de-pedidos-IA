package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.ChatMenuItemDto;
import br.com.sugestaopedidos.backend.dto.ChatRestaurantDto;
import br.com.sugestaopedidos.backend.service.ChatMenuItemService;
import br.com.sugestaopedidos.backend.service.ChatRestaurantService;
import br.com.sugestaopedidos.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ai")
@RequiredArgsConstructor
public class OpenAiController {

    private final ChatRestaurantService chatRestaurantService;
    private final ChatMenuItemService chatMenuItemService;
    private final ProfileService profileService;

    @PostMapping("/chat")
    public ResponseEntity<List<ChatRestaurantDto>> consultOpenAi(@RequestBody List<ChatRestaurantDto> chatRequestDtos) {
        List<ChatRestaurantDto> response = chatRestaurantService.consumeChatRestaurant(chatRequestDtos);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat/{id}")
    public ResponseEntity<List<ChatMenuItemDto>> consultOpenAiMenuItem(@RequestBody List<ChatMenuItemDto> chatMenuItemDtos, @PathVariable String id) {
        List<ChatMenuItemDto> response = chatMenuItemService.consumeChatMenuItem(chatMenuItemDtos, id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/profile")
    public ResponseEntity<Void> consultOpenAiProfile(@RequestBody List<ChatRestaurantDto> chatDtoList) {
        profileService.generateProfile(chatDtoList);
        return ResponseEntity.ok().build();
    }
}
