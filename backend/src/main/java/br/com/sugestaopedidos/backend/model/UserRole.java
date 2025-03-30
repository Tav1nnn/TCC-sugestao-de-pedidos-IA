package br.com.sugestaopedidos.backend.model;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN("ADMIN"),
    CLIENT("CLIENT");

    private final String role;

    UserRole(String role){
        this.role = role;
    }

}
