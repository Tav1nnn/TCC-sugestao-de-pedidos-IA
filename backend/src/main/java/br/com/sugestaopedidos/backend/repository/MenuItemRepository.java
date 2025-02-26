package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
}
