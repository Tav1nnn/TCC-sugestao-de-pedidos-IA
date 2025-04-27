package br.com.sugestaopedidos.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MenuItemHomeDto {

    private List<CategoryDto> menu;

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class CategoryDto {
        private String categoryId;
        private String category;
        private List<MenuItemDto> menuItem;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class MenuItemDto {
        private String menuItemId;
        private String name;
        private List<IngredientsDto> ingredients;
        private String imageUrl;
        private Double price;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class IngredientsDto {
        private String ingredientId;
        private String ingredient;
    }
}
