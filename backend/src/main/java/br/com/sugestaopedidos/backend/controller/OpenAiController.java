package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.ChatDto;
import br.com.sugestaopedidos.backend.service.ChatService;
import br.com.sugestaopedidos.backend.service.ProfileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class OpenAiController {
    private final ChatService chatService;
    private final ProfileService profileService;

    @PostMapping("/chat")
    public List<ChatDto> consultOpenAi(@RequestBody List<ChatDto> chatRequestDtos, @RequestHeader("userId") String userId ) {
        return chatService.consumeChatRestaurant(chatRequestDtos, userId);
    }

    @PostMapping("/profile")
    public void consultOpenAiProfile(@RequestBody List<ChatDto> chatDtoList, @RequestHeader("userId") String userId){
        profileService.generateProfile(chatDtoList, userId);
    }
}
