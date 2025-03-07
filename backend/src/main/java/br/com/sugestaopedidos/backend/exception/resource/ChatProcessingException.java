package br.com.sugestaopedidos.backend.exception.resource;

public class ChatProcessingException extends RuntimeException {
    public ChatProcessingException(String msg) {
        super(msg);
    }
}
