package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.client.ConsumeOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.dto.ChatRestaurantDto;
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

    public void generateProfile (List<ChatRestaurantDto> chatDtoList, String userId) {
        RequestOpenAi requestOpenAi = createRequest(chatDtoList, getUserProfile(userId));

        ResponseOpenAi responseOpenAi = consumeOpenAi.consumeOpenAi(requestOpenAi).block();

        log.info("Request: {}", requestOpenAi);
        log.info("Response: {}", responseOpenAi);

        if (responseOpenAi == null) {
            throw new RuntimeException("Falha ao obter resposta do OpenAI");
        }
        updateProfileUser(responseOpenAi);
    }

    private RequestOpenAi createRequest (List<ChatRestaurantDto> chatDtoList, String userProfile) {
        RequestOpenAi requestOpenAi = new RequestOpenAi();

        chatDtoList.forEach(chatDto -> chatDto.setRestaurantResponseDto(null));

        StringBuilder message = new StringBuilder("Resuma o perfil do cliente com base na conversa com o bot. "+
            "Organize a resposta em dois tópicos: 'Restrições Alimentares' e 'Preferências'. " +
            "O perfil deve ter no máximo 300 caracteres, ser direto e objetivo com retorno de apenas texto simples.");


        if(userProfile != null && !userProfile.isBlank()) {
           message.append(" Perfil anterior: ").append(userProfile).append(". Atualize conforme necessário.");
        }

        requestOpenAi.getMessages().addAll(List.of(
                new Message(Role.system, message.toString()),
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
