package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemRequestDto {
    private String name;
    private String description;
    private Double price;
    private String imageURL;
    private String categoryId;
    private Set<String> ingredientIds;
}
