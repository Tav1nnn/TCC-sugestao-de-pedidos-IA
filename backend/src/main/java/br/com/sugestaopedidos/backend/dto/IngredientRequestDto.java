package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredientRequestDto {

    //@NotBlank(message = "name cannot be null")
    private String name;

    private Boolean isGlobal;

    //@NotBlank(message = "restaurantId cannot be null")
    private String restaurantId;
}
