package br.com.sugestaopedidos.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws JsonProcessingException {
		String hash = new BCryptPasswordEncoder().encode("123");

		System.out.println("Hash gerado: " + hash);
		SpringApplication.run(BackendApplication.class, args);
	}

}

