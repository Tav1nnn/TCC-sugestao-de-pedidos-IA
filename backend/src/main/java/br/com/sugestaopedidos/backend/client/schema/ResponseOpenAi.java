package br.com.sugestaopedidos.backend.client.schema;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
public class ResponseOpenAi {
    private String id;
    private String object;
    private Integer created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    private String service_tier;
    private String system_fingerprint;

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Choice {
        private Integer index;
        private Message message;
        private Boolean logprobs;
        private String finish_reason;

    }
    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private static class Usage {
        private Integer prompt_tokens;
        private Integer completion_tokens;
        private Integer total_tokens;
        private PromptTokensDetails prompt_tokens_details;
        private CompletionTokensDetails completion_tokens_details;

    }
    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private static class PromptTokensDetails {
        private Integer cached_tokens;
        private Integer audio_tokens;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private static class CompletionTokensDetails {
        private Integer reasoning_tokens;
        private Integer audio_tokens;
        private Integer accepted_prediction_tokens;
        private Integer rejected_prediction_tokens;
    }
}
