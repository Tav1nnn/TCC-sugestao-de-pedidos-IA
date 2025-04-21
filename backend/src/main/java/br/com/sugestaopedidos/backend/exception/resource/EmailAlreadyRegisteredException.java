package br.com.sugestaopedidos.backend.exception.resource;

public class EmailAlreadyRegisteredException extends RuntimeException {
    public EmailAlreadyRegisteredException(String msg) {
        super(msg);
    }
}
