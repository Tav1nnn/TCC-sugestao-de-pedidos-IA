package br.com.sugestaopedidos.backend.controller;

import br.com.sugestaopedidos.backend.dto.IngredientRequestDto;
import br.com.sugestaopedidos.backend.dto.IngredientResponseDto;
import br.com.sugestaopedidos.backend.service.IngredientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Set;

@RestController
@RequestMapping("api/ingredients")
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    public Set<IngredientResponseDto> getAllCategories() {
        return ingredientService.findAllIngredients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientResponseDto> getByIdIngredient(@PathVariable String id) {
        return ResponseEntity.ok(ingredientService.findByIdIngredients(id));
    }

    @PostMapping
    public ResponseEntity<Void> createIngredient(@Valid @RequestBody IngredientRequestDto request) {
        IngredientResponseDto ingredientResponseDto = ingredientService.createIngredient(request);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(ingredientResponseDto.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateIngredient(@PathVariable String id, @Valid @RequestBody IngredientRequestDto ingredientRequestDto) {
        ingredientService.updateIngredient(id, ingredientRequestDto);
        return  ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable String id) {
        ingredientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
