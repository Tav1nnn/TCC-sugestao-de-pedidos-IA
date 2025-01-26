package br.com.sugestaopedidos.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRequestDto {

    //@NotBlank(message = "name cannot be null")
    private String name;

    //@NotBlank(message = "description cannot be null")
    private String description;

    //@NotBlank(message = "address cannot be null")
    private String address;

    //@NotBlank(message = "phone cannot be null")
    private String phone;

    //@NotBlank(message = "cnpj cannot be null")
    private String cnpj;

    //@NotBlank(message = "ie cannot be null")
    private String ie;

    //@NotBlank(message = "name cannot be null")
    private String imageUrl;
}
