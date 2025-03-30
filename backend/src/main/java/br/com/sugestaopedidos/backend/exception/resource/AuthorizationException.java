package br.com.sugestaopedidos.backend.exception.resource;

public class AuthorizationException extends RuntimeException {
    public AuthorizationException(String msg) {
        super(msg);
    }
}
