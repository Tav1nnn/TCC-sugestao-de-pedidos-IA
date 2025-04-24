package br.com.sugestaopedidos.backend.dto;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestDto {
    private String name;
    private String email;
    private String password;
    private String document;
    private String address;
    private String phone;
    private String imageUrl;
}
