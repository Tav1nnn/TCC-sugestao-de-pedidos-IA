package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, String> {

    @Query("SELECT c FROM menu_items c WHERE c.restaurant IN :restaurants")
    List<MenuItem> findByRestaurants(@Param("restaurants")List<Restaurant> restaurants);
    List<MenuItem> findMenuItemByRestaurant(Restaurant restaurant);
    MenuItem findMenuItemByRestaurantAndName(Restaurant restaurant, String name);
    List<MenuItem> findByCategoryId(String categoryId);
    List<MenuItem> findByIngredientsId(String ingredientId);
}
