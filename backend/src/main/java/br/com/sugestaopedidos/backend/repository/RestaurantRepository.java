package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, String> {
    Optional<Restaurant> findByCnpj(String cnpj);
    Optional<Restaurant> findByIe(String ie);
}
