package br.com.sugestaopedidos.backend.exception;

import br.com.sugestaopedidos.backend.exception.model.StandardError;
import br.com.sugestaopedidos.backend.exception.resource.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;
import java.time.Instant;

@ControllerAdvice
public class GlobalExceptionHandler {
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<StandardError> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        StandardError error = new StandardError();
        error.setTimestamp(Instant.now());
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setError("Resource not found");
        error.setMessage(ex.getMessage());
        error.setPath(request.getDescription(false).replace("uri=", ""));

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

        @ExceptionHandler(RelatedObjectException.class)
        public ResponseEntity<StandardError> handleRelatedObject(RelatedObjectException ex, WebRequest request) {
        StandardError error = new StandardError();
        error.setTimestamp(Instant.now());
        error.setStatus(HttpStatus.CONFLICT.value());
        error.setError("Related object conflict");
        error.setMessage(ex.getMessage());
        error.setPath(request.getDescription(false).replace("uri=", ""));

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<StandardError> handleGeneric(Exception ex, WebRequest request) {
        StandardError error = new StandardError();
        error.setTimestamp(Instant.now());
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setError("Internal Server Error");
        error.setMessage(ex.getMessage());
        error.setPath(request.getDescription(false).replace("uri=", ""));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    public ResponseEntity<StandardError> emailAlreadyRegistered(EmailAlreadyRegisteredException e, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Email já registrado");
        err.setMessage(e.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DocumentAlreadyRegisteredException.class)
    public ResponseEntity<StandardError> documentAlreadyRegistered(DocumentAlreadyRegisteredException e, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Documento já registrado");
        err.setMessage(e.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<StandardError> handleUsernameNotFound(UsernameNotFoundException e, WebRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("User not found");
        err.setMessage(e.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardError> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Invalid credentials");
        err.setMessage(ex.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(OpenAiRequestException.class)
    public ResponseEntity<StandardError> handleOpenAiRequest(OpenAiRequestException e, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_GATEWAY;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Failed to communicate with OpenAI");
        err.setMessage(e.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ChatProcessingException.class)
    public ResponseEntity<StandardError> handleChatProcessing(ChatProcessingException e, WebRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Failed to process chat response");
        err.setMessage(e.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<StandardError> handleInvalidTokenException(InvalidTokenException ex, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST; // ou HttpStatus.UNAUTHORIZED dependendo do seu caso
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError("Bad Request");
        err.setMessage(ex.getMessage());
        err.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(status).body(err);
    }

}
