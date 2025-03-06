package br.com.sugestaopedidos.backend.config;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.AnyKeyJavaClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@AllArgsConstructor
public class WebClientConfig {

    private RestProperties restProperties;

    @Bean
    public WebClient getWebClient() {
        return WebClient.builder().baseUrl(restProperties.getHost()).build();
    }
}
