package br.com.sugestaopedidos.backend.client;

import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.RequestOpenAi;
import br.com.sugestaopedidos.backend.client.schema.ResponseOpenAi;
import br.com.sugestaopedidos.backend.client.schema.Role;
import br.com.sugestaopedidos.backend.config.RestProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ConsumeOpenAi {
    private final WebClient webClient;
    private final RestProperties restProperties;
    private final ObjectMapper objectMapper;
    public Mono<ResponseOpenAi> consuteOpenAi(RequestOpenAi requestOpenAi) {
        try {
            String requestBody = objectMapper.writeValueAsString(requestOpenAi);
            log.info("Enviando requisição para OpenAI: {}", requestBody);
        } catch (Exception e) {
            log.error("Erro ao serializar a requisição", e);
        }

        return webClient.post()
                .uri("https://api.openai.com/v1/chat/completions")
                .header("Authorization", "Bearer " + restProperties.getKey())
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(requestOpenAi), RequestOpenAi.class)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError(),
                        response -> response.bodyToMono(String.class).flatMap(errorBody -> {
                            log.error("Erro 4xx na chamada para OpenAI: {}", errorBody);
                            return Mono.error(new RuntimeException("Erro 4xx: " + errorBody));
                        })
                )
                .bodyToMono(ResponseOpenAi.class);
    }
    }
