package br.com.sugestaopedidos.backend.exception.resource;

public class AuthenticationFailedException extends RuntimeException {
    public AuthenticationFailedException(String msg) {
        super(msg);
    }
}
