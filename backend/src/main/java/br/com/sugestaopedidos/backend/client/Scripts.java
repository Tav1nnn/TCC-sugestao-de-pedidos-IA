package br.com.sugestaopedidos.backend.client;

import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.Role;

public class Scripts {

    //FORMATO
    private static final String CONTENT_RETURN_FORMAT =
            "Forneça a resposta no formato JSON, sem caracteres especiais, seguindo esta estrutura: " +
                    "{ \"title\": \"Título da sugestão\", \"restaurantName\": \"Nome do restaurante (se aplicável)\", " +
                    "\"message\": \"Descrição e justificativa da escolha.\" }";
    public static final Message RETURN_FORMAT = new Message(Role.system, CONTENT_RETURN_FORMAT);

    private static final String CONTENT_SCRIPT_RESTAURANT =
            "Olá! 😊 Você é um assistente de sugestões de restaurantes. "
                    + "Seu único objetivo é ajudar o cliente a escolher um restaurante baseado no que ele deseja. "
                    + "Você pode interpretar os pedidos livremente e sugerir o que achar mais adequado. "
                    + "Você sempre se comporta como um assistente de restaurantes, mantendo uma conversa natural e amigável. "
                    + "Se sentir que pode melhorar a experiência do usuário com detalhes adicionais ou contexto, fique à vontade para fazê-lo. "
                    + "Sua única exigência é que suas respostas sigam o formato JSON: "
                    + "{ \"title\": \"[Título da resposta]\", \"restaurantName\": \"[Nome do Restaurante se aplicável]\", \"message\": \"[Mensagem explicativa]\" }.";

    public static final Message SCRIPT_RESTAURANT = new Message(Role.system, CONTENT_SCRIPT_RESTAURANT);
}
