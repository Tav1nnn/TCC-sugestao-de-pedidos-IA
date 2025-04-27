package br.com.sugestaopedidos.backend.filter;

import br.com.sugestaopedidos.backend.exception.model.StandardError;
import br.com.sugestaopedidos.backend.repository.UserRepository;
import br.com.sugestaopedidos.backend.service.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        if (requestURI.equals("/api/users/login") || requestURI.equals("/api/users/register")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = this.recoverToken(request);

            if (token == null) {
                sendJsonError(request, response, "Token not found", HttpStatus.UNAUTHORIZED);
                return;
            }

            String email = tokenService.validateToken(token);
            UserDetails user = userRepository.findByEmail(email);

            if (user == null) {
                sendJsonError(request, response, "User not found by token", HttpStatus.UNAUTHORIZED);
                return;
            }

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            sendJsonError(request, response, "Authentication error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }

    private void sendJsonError(HttpServletRequest request, HttpServletResponse response, String message, HttpStatus status) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());

        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError(status.getReasonPhrase());
        err.setMessage(message);
        err.setPath(request.getRequestURI());

        objectMapper.writeValue(response.getWriter(), err);
    }
}
