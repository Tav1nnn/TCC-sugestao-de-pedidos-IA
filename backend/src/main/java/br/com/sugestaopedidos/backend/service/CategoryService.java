package br.com.sugestaopedidos.backend.service;

import br.com.sugestaopedidos.backend.dto.CategoryRequestDto;
import br.com.sugestaopedidos.backend.dto.CategoryResponseDto;
import br.com.sugestaopedidos.backend.exception.resource.RelatedObjectException;
import br.com.sugestaopedidos.backend.exception.resource.ResourceNotFoundException;
import br.com.sugestaopedidos.backend.mapper.CategoryMapper;
import br.com.sugestaopedidos.backend.model.Category;
import br.com.sugestaopedidos.backend.model.MenuItem;
import br.com.sugestaopedidos.backend.model.User;
import br.com.sugestaopedidos.backend.repository.CategoryRepository;
import br.com.sugestaopedidos.backend.repository.MenuItemRepository;
import br.com.sugestaopedidos.backend.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.StringJoiner;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final MenuItemRepository menuItemRepository;

    public Set<CategoryResponseDto> findAllCategories() {
        User user = AuthUtils.getCurrentUser();
        return categoryRepository.findAllByRestaurant(user.getRestaurant()).stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toSet());
    }

    public CategoryResponseDto findByIdCategories(String id) {
        User user = AuthUtils.getCurrentUser();
        Category category = categoryRepository.findByIdAndRestaurant(id, user.getRestaurant())
                .orElseThrow(() -> getResourceNotFoundException(id));

        return categoryMapper.toDto(category);
    }

    public CategoryResponseDto createCategory(CategoryRequestDto categoryRequestDto) {
        User user = AuthUtils.getCurrentUser();
        Category category = categoryMapper.toEntity(categoryRequestDto);
        category.setRestaurant(user.getRestaurant());
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    public void updateCategory(String id, CategoryRequestDto categoryRequestDto) {
        User user = AuthUtils.getCurrentUser();
        Category category = categoryRepository.findByIdAndRestaurant(id, user.getRestaurant())
                .orElseThrow(() -> getResourceNotFoundException(id));

        categoryMapper.updateEntityFromRequest(category, categoryRequestDto);

        categoryRepository.save(category);
    }

    public void delete(String id) {
        User user = AuthUtils.getCurrentUser();
        if (!categoryRepository.existsByIdAndRestaurant(id, user.getRestaurant())) throw getResourceNotFoundException(id);

        List<MenuItem> listMenuItem = menuItemRepository.findByCategoryId(id);

        if(!listMenuItem.isEmpty()) {
            String ids = listMenuItem.stream()
                    .map(MenuItem::getId)
                    .collect(Collectors.joining(","));
            throw new RelatedObjectException(ids);
        }

        categoryRepository.deleteById(id);
    }

    private static ResourceNotFoundException getResourceNotFoundException(String id) {
        return new ResourceNotFoundException(id);
    }
}
