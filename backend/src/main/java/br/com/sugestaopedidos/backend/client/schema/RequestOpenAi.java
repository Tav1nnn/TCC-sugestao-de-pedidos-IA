package br.com.sugestaopedidos.backend.client.schema;

import br.com.sugestaopedidos.backend.client.Scripts;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RequestOpenAi {
    private String model;
    private List<Message> messages;
    private Float temperature;

    public RequestOpenAi() {
        this.model = "gpt-4o-mini";
        this.temperature = 1.0F;
        this.messages = new ArrayList<>();
    }

    public static RequestOpenAi REQUEST_RESTAURANT(Message message){
        RequestOpenAi request = new RequestOpenAi();
        request.getMessages().addAll(List.of(
                Scripts.SCRIPT_RESTAURANT,
                Scripts.RETURN_FORMAT,
                message
        ));
        return request;
    }

    public static RequestOpenAi REQUEST_MENU_ITEM(Message message) {
        RequestOpenAi request = new RequestOpenAi();
        request.getMessages().addAll(List.of(
                Scripts.SCRIPT_MENU_ITEM,
                Scripts.RETURN_FORMAT,
                message
        ));
        return request;
    }
}
