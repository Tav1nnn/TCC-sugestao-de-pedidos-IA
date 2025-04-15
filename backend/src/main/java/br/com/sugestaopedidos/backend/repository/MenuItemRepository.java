package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
    List<MenuItem> findMenuItemByRestaurant(Restaurant restaurant);

    MenuItem findMenuItemByRestaurantAndName(Restaurant restaurant, String name);
}
