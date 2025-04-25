package br.com.sugestaopedidos.backend.dto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemResponseChatDto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    private Double price;
    private String imageURL;
    private String restaurantId;
    private String categoryId;
    private Set<IngredientResponseDto> ingredients;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
