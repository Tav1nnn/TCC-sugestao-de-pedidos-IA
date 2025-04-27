package br.com.sugestaopedidos.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationDto {

    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
