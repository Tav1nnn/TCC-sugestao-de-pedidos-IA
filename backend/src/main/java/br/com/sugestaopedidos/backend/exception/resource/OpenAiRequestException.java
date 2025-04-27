package br.com.sugestaopedidos.backend.exception.resource;

public class OpenAiRequestException extends RuntimeException {
    public OpenAiRequestException() {
        super("Failed to get a response from OpenAI");
    }
}
