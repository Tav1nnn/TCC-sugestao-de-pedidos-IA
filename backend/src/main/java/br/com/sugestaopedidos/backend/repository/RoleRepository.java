package br.com.sugestaopedidos.backend.repository;

import br.com.sugestaopedidos.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
}
