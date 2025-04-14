package br.com.sugestaopedidos.backend.client.schema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private Role role;
    private String content;
    private String refusal;

    public Message(Role role, String content) {
        this.role = role;
        this.content = content;
    }
}
