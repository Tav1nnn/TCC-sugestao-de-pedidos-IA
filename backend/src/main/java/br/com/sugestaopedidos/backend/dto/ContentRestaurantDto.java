package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentRestaurantDto {
    private String title;
    private String restaurantName;
    private String message;
}
