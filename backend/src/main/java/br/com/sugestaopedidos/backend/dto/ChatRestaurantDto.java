package br.com.sugestaopedidos.backend.dto;

import br.com.sugestaopedidos.backend.client.schema.Message;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatRestaurantDto {
    private Message message;
    private RestaurantResponseDto restaurantResponseDto;
}
