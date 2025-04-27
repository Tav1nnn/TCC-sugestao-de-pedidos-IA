package br.com.sugestaopedidos.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemRequestDto {

    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @Positive
    private Double price;
    @NotBlank
    private String imageURL;
    @NotBlank
    private String categoryId;
    @NotNull
    private Set<String> ingredientIds;
}
