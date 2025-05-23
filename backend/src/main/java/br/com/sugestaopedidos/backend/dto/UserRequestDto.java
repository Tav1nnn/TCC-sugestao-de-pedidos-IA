package br.com.sugestaopedidos.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

@Data
@NoArgsConstructor
public class UserRequestDto {
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    @CPF
    private String document;
    @NotBlank
    private String address;
    @NotBlank
    private String phone;
    @NotBlank
    private String imageUrl;
}
