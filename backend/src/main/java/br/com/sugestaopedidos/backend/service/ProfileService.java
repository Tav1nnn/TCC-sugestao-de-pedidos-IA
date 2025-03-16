package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.client.ConsumeOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.dto.ChatDto;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final ConsumeOpenAi consumeOpenAi;
    private User user;



    public void generateProfile (List<ChatDto> chatDtoList, String userId) {

        RequestOpenAi requestOpenAi = createRequest(chatDtoList, getUserProfile(userId));

        ResponseOpenAi responseOpenAi = consumeOpenAi.consumeOpenAi(requestOpenAi).block();


        log.info("Request: {}", requestOpenAi);
        log.info("Response: {}", responseOpenAi);

        if (responseOpenAi == null) {
            throw new RuntimeException("Falha ao obter resposta do OpenAI");
        }
        updateProfileUser(responseOpenAi);
    }

    private RequestOpenAi createRequest (List<ChatDto> chatDtoList, String userProfile) {
        RequestOpenAi requestOpenAi = new RequestOpenAi();

        for(ChatDto chatDto : chatDtoList) {
            chatDto.setRestaurantResponseDto(null);
        }

        String message = "Preciso que voce me retorno como é o perfil " +
                "do meu clite com base na conversa que ele teve com meu bot, " +
                "me retorne apenas o perfil no maximo 1000 caracteres";

        if(userProfile != null) {
            message += " esse é seu perfil antigo entao atualize ele: " + userProfile;
        }

        requestOpenAi.getMessages().addAll(List.of(
                new Message(Role.system, message),
                new Message(Role.system, "Conversa com o bot: " + chatDtoList.toString())
        ));

        return requestOpenAi;
    }

    private String getUserProfile(String userId) {
        this.user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not fount id: " + userId));
        return user.getProfile() != null ? user.getProfile() : null;

    }

    private void updateProfileUser (ResponseOpenAi responseOpenAi) {
        String content = responseOpenAi.getChoices().getFirst().getMessage().getContent();

        this.user.setProfile(content);

        userRepository.save(this.user);
    }
}
