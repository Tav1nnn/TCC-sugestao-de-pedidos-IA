package br.com.sugestaopedidos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
public class RestaurantFormatDto {
    private String name;
    private String description;
    private Set<String> categories;
    private Set<String> menuItems;

    public RestaurantFormatDto () {
        this.categories = new HashSet<>();
        this.menuItems = new HashSet<>();
    }
}
