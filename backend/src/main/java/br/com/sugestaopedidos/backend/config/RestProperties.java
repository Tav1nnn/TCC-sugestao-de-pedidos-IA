package br.com.sugestaopedidos.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(value = "spring.backend")
public class RestProperties {
    private String host;
    private String key;
}
