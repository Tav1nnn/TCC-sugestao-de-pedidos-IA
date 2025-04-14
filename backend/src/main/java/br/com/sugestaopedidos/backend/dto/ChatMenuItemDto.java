package br.com.sugestaopedidos.backend.dto;

import br.com.sugestaopedidos.backend.client.schema.Message;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class ChatMenuItemDto {
    private Message message;
    private MenuItemResponseDto menuItemResponseDto;
    private List<MenuItemResponseDto> sides;

    public ChatMenuItemDto () {
        this.sides = new ArrayList<>();
    }
}
