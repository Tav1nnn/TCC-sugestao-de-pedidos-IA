package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, String> {
    Optional<Category> findByRestaurant(Restaurant restaurant);
}
