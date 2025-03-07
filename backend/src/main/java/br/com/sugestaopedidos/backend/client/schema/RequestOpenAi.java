package br.com.sugestaopedidos.backend.client.schema;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RequestOpenAi {
    private String model;
    private List<Message> messages;

    public RequestOpenAi() {
        this.model = "gpt-4o-mini";
        this.messages = new ArrayList<>();
    }
}
