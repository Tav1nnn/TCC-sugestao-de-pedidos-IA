package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class ContentMenuItemDto {
    private String title;
    private String dishesName;
    private List<String> sides;
    private String message;

    public ContentMenuItemDto() {
        this.sides = new ArrayList<>();
    }
}
