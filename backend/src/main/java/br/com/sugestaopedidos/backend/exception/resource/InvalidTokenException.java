package br.com.sugestaopedidos.backend.exception.resource;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String msg) {
        super(msg);
    }
}
