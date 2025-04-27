package br.com.sugestaopedidos.backend.exception.resource;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String msg) {
        super("Object not found with id" + msg);
    }
}
