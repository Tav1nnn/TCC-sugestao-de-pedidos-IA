package br.com.sugestaopedidos.backend.exception.resource;

public class UsernameNotFoundException extends RuntimeException {
    public UsernameNotFoundException(String msg) {
        super("User not found with email: " + msg);
    }
}
