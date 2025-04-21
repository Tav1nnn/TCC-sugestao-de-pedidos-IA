package br.com.sugestaopedidos.backend.exception.resource;

public class RelatedObjectException extends RuntimeException {
    public RelatedObjectException(String msg) {
        super(msg);
    }
}
