package br.com.sugestaopedidos.backend.controller;


import br.com.sugestaopedidos.backend.dto.AuthenticationDto;
import br.com.sugestaopedidos.backend.dto.LoginResponseDto;
import br.com.sugestaopedidos.backend.dto.UserRequestDto;
import br.com.sugestaopedidos.backend.dto.UserResponseDto;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.service.TokenService;
import br.com.sugestaopedidos.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto authenticationDto){
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(authenticationDto.getEmail(), authenticationDto.getPassword());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);

        String token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(token));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto responseDto = userService.registerUser(userRequestDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseDto.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> update(@RequestBody UserRequestDto userRequestDto) {
        userService.updateUser(userRequestDto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserResponseDto> get() {
        UserResponseDto userResponseDto = userService.getUserByAuthenticated();

        return ResponseEntity.ok(userResponseDto);
    }
}
