package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.UserRequestDto;
import br.com.sugestaopedidos.backend.dto.UserResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.DocumentAlreadyRegisteredException;
import br.com.sugestaopedidos.backend.exception.resource.EmailAlreadyRegisteredException;
import br.com.sugestaopedidos.backend.mapper.UserMapper;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.model.UserRole;
import br.com.sugestaopedidos.backend.repository.UserRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto registerUser (UserRequestDto userRequestDto) {
        verifyEmail(userRequestDto.getEmail());
        verifyDocument(userRequestDto.getDocument());

        User user = userMapper.toEntity(userRequestDto);
        user.setRole(UserRole.CLIENT);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User newUser = userRepository.save(user);

        return userMapper.toDto(newUser);
    }

    public void updateUser (UserRequestDto userRequestDto) {
        User userAuthenticated = AuthUtils.getCurrentUser();

        if(!userAuthenticated.getEmail().equals(userRequestDto.getEmail())){
            verifyEmail(userRequestDto.getEmail());
        }
        if(!userAuthenticated.getDocument().equals(userRequestDto.getDocument())) {
            verifyDocument(userRequestDto.getDocument());
        }

        User userUpdate = userMapper.toEntity(userRequestDto);
        userUpdate.setId(userAuthenticated.getId());
        userUpdate.setRole(UserRole.CLIENT);
        userUpdate.setPassword(passwordEncoder.encode(userUpdate.getPassword()));

        userRepository.save(userUpdate);
    }

    public UserResponseDto getUserByAuthenticated () {
        User userAuthenticated = AuthUtils.getCurrentUser();

        return userMapper.toDto(userAuthenticated);
    }

    private void verifyEmail(String email) {
        UserDetails userDetails = userRepository.findByEmail(email);

        if(userDetails != null) {
            throw new EmailAlreadyRegisteredException(email);
        }
    }

    private void verifyDocument(String document) {
        UserDetails userDetails = userRepository.findByDocument(document);

        if(userDetails != null) {
            throw new DocumentAlreadyRegisteredException(document);
        }
    }

}
