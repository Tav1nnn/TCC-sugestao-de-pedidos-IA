package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.CategoryRequestDto;
import br.com.sugestaopedidos.backend.dto.CategoryResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.CategoryMapper;
import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    private static ResourceNotFoundException getResourceNotFoundException(String id) {
        return new ResourceNotFoundException("Category not found with id: " + id);
    }

    public Set<CategoryResponseDto> findAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toSet());
    }

    public CategoryResponseDto findByIdCategories(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> getResourceNotFoundException(id));

        return categoryMapper.toDto(category);
    }

    public CategoryResponseDto createCategory(CategoryRequestDto categoryRequestDto) {
        Category category = categoryMapper.toEntity(categoryRequestDto);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    public void updateCategory(String id, CategoryRequestDto categoryRequestDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> getResourceNotFoundException(id));

        categoryMapper.updateEntityFromRequest(category, categoryRequestDto);

        categoryRepository.save(category);
    }

    public void delete(String id) {
        if (!categoryRepository.existsById(id)) throw getResourceNotFoundException(id);

        categoryRepository.deleteById(id);
    }
}
