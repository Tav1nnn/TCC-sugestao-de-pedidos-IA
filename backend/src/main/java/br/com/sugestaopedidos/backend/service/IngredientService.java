package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.IngredientRequestDto;
import br.com.sugestaopedidos.backend.dto.IngredientResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.IngredientMapper;
import br.com.sugestaopedidos.backend.model.Ingredient;
import br.com.sugestaopedidos.backend.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;

    public Set<IngredientResponseDto> findAllCategories() {
        return ingredientRepository.findAll().stream()
                .map(ingredientMapper::toDto)
                .collect(Collectors.toSet());
    }

    public IngredientResponseDto findByIdCategories(String id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> getResourceNotFoundException(id));

        return ingredientMapper.toDto(ingredient);
    }

    public IngredientResponseDto createIngredient(IngredientRequestDto ingredientRequestDto) {
        Ingredient ingredient = ingredientMapper.toEntity(ingredientRequestDto);
        ingredient = ingredientRepository.save(ingredient);
        return ingredientMapper.toDto(ingredient);
    }

    public void updateIngredient(String id, IngredientRequestDto ingredientRequestDto) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> getResourceNotFoundException(id));

        ingredientMapper.updateEntityFromRequest(ingredient, ingredientRequestDto);

        ingredientRepository.save(ingredient);
    }

    public void delete(String id) {
        if(!ingredientRepository.existsById(id)) throw getResourceNotFoundException(id);

        ingredientRepository.deleteById(id);
    }

    private static ResourceNotFoundException getResourceNotFoundException(String id) {
        return new ResourceNotFoundException("Ingredient not found with id: " + id);
    }
}
