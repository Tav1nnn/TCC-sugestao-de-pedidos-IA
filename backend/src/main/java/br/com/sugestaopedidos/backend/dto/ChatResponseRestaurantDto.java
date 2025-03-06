package br.com.sugestaopedidos.backend.dto;

import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponseRestaurantDto {
    private Role role;
    private Message message;
    private RestaurantResponseDto restaurantResponseDto;
}
