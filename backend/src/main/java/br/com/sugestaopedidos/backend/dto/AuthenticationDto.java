package br.com.sugestaopedidos.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationDto {
    private String email;
    private String password;
}
