package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.ChatMenuItemDto;
import br.com.sugestaopedidos.backend.dto.ChatRestaurantDto;
import br.com.sugestaopedidos.backend.service.ChatMenuItemService;
import br.com.sugestaopedidos.backend.service.ChatRestaurantService;
import br.com.sugestaopedidos.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
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
    public List<ChatRestaurantDto> consultOpenAi(@RequestBody List<ChatRestaurantDto> chatRequestDtos) {
        return chatRestaurantService.consumeChatRestaurant(chatRequestDtos);
    }

    @PostMapping("/chat/{id}")
    public List<ChatMenuItemDto> consultOpenAiMenuItem(@RequestBody List<ChatMenuItemDto> chatMenuItemDto,  @PathVariable String id){
        return chatMenuItemService.consumeChatMenuItem(chatMenuItemDto, id);
    }

    @PostMapping("/profile")
    public void consultOpenAiProfile(@RequestBody List<ChatRestaurantDto> chatDtoList){
        profileService.generateProfile(chatDtoList);
    }
}
