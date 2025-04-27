package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemResponseDto {

    private String id;
    private String name;
    private String description;
    private Double price;
    private String imageURL;
    private String restaurantId;
    private String categoryId;
    private Set<String> ingredientIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
