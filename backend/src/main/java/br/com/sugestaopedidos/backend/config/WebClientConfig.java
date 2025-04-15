package br.com.sugestaopedidos.backend.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
@AllArgsConstructor
public class WebClientConfig {

    private RestProperties restProperties;

    @Bean
    public WebClient getWebClient() {
        return WebClient.builder()
                .baseUrl(restProperties.getHost())
                .clientConnector(new ReactorClientHttpConnector(HttpClient.create()
                        .responseTimeout(Duration.ofSeconds(30))))
                .build();
    }
}
