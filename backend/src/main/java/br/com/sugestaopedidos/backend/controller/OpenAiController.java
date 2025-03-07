package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.ChatDto;
import br.com.sugestaopedidos.backend.service.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/chat")
@RequiredArgsConstructor
public class OpenAiController {
    private final ChatService chatService;

    @PostMapping
    public List<ChatDto> consultOpenAi(@RequestBody List<ChatDto> chatRequestDtos) throws JsonProcessingException {
        return chatService.consumeChatRestaurant(chatRequestDtos);
    }
}
