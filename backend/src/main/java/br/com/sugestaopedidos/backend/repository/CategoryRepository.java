package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {
    @Query("SELECT c FROM categories c WHERE c.restaurant IN :restaurants")
    List<Category> findByRestaurants(@Param("restaurants")List<Restaurant> restaurants);
    List<Category> findAllByRestaurant(Restaurant restaurant);
    Optional<Category> findByIdAndRestaurant(String id, Restaurant restaurant);
    Boolean existsByIdAndRestaurant(String id, Restaurant restaurant);
}
