package br.com.sugestaopedidos.backend.client;

import br.com.sugestaopedidos.backend.client.schema.Message;
import br.com.sugestaopedidos.backend.client.schema.Role;

public class Scripts {

    //FORMATO
    private static final String CONTENT_RETURN_FORMAT =
            "Forneça a resposta no formato JSON, sem caracteres especiais, seguindo esta estrutura: " +
                    "{ \"title\": \"Nome do item escolhido\", \"message\": \"Motivo da escolha.\" }";
    public static final Message RETURN_FORMAT = new Message(Role.system, CONTENT_RETURN_FORMAT);

    //MENU_ITEM
    private static final String CONTENT_ERROR_MENU_ITEM = "Se o usuário demonstrar preferência por um restaurante específico e não quiser considerar outras opções, me avise com a seguinte mensagem: {\\\"titulo\\\": \\\"USER COM PREFERÊNCIA\\\", \\\"mensagem\\\": \\\"O usuário já tem um restaurante em mente e não deseja escolher outro.\\\"}";
    private static final String CONTENT_SCRIPT_MENU_ITEM = "Você é um Sistema de Sugestão para Restaurantes utilizando Inteligência Artificial. Sua função é ajudar o cliente a escolher um prato. Se o cliente mencionar um prato que não está no cardápio, sugira uma opção semelhante. Se o cliente perguntar algo não relacionado a restaurantes, responda educadamente que este bot é especializado apenas em recomendações de pratos.";
    public static final Message ERROR_MENU_ITEM = new Message(Role.system, CONTENT_ERROR_MENU_ITEM);
    public static final Message SCRIPT_MENU_ITEM = new Message(Role.system, CONTENT_SCRIPT_MENU_ITEM);

    //RESTAURANTE
    private static final String CONTENT_SCRIPT_RESTAURANT =
            "Você é um Sistema de Sugestão para Restaurantes utilizando Inteligência Artificial. "
                    + "Sua função é ajudar o cliente a escolher um restaurante baseanos na informações do restaurante como descrição e categorias. "
                    + "Se o cliente mencionar um restaurante que não está na lista, sugira uma opção semelhante. "
                    + "Se o cliente descrever um tipo de comida (ex: japonesa), sugira o restaurante correspondente a comida italiana"
                    + "o mesmo deve se seguir para outros tipos, sempre tente sugerir um restaurante .";

    private static final String CONTENT_ERROR_RESTAURANT =
            "Se o usuário rejeitar todas as sugestões e insistir em um restaurante específico, "
                    + "me avise com a seguinte mensagem: { \"title\": \"USER COM PREFERÊNCIA\", "
                    + "\"message\": \"[sua mensagem de erro]\" }. "
                    + "Se o cliente perguntar algo não relacionado a restaurantes, informe que este bot "
                    + "é especializado apenas em recomendações de restaurantes. "
                    + "Me avise com a seguinte mensagem: { \"title\": \"NÃO RELACIONADO\", \"message\": \"[sua mensagem de erro]\" }.";
    public static final Message ERROR_RESTAURANT = new Message(Role.system, CONTENT_ERROR_RESTAURANT);
    public static final Message SCRIPT_RESTAURANT = new Message(Role.system, CONTENT_SCRIPT_RESTAURANT);
}
