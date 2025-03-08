package br.com.sugestaopedidos.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws JsonProcessingException {
		SpringApplication.run(BackendApplication.class, args);

	}

}

