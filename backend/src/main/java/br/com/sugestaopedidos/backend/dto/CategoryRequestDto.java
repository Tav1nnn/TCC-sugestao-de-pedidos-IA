package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {

    //@NotBlank(message = "name cannot be null")
    private String name;

    //@NotBlank(message = "restaurantId cannot be null")
    private String restaurantId;
}
