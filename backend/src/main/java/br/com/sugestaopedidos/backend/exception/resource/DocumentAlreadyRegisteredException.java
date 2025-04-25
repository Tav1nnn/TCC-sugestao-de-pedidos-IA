package br.com.sugestaopedidos.backend.exception.resource;

public class DocumentAlreadyRegisteredException extends RuntimeException {
    public DocumentAlreadyRegisteredException(String msg) {
        super(msg);
    }
}
