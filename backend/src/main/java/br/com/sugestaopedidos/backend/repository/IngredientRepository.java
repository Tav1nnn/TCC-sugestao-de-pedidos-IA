package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, String> {
    Optional<Category> findByRestaurant(Restaurant restaurant);

    @Query("SELECT i FROM ingredients i WHERE i.isGlobal = true OR i.restaurant = :restaurant")
    List<Ingredient> findByIsGlobalTrueOrRestaurant(@Param("restaurant") Restaurant restaurant);

    Optional<Ingredient> findByIdAndRestaurant(String id, Restaurant restaurant);

    Boolean existsByIdAndRestaurant(String id, Restaurant restaurant);
}
