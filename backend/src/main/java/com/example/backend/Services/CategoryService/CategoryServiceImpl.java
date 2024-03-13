package com.example.backend.Services.CategoryService;

import com.example.backend.Entity.Category;
import com.example.backend.Payload.Request.CategoryReq;
import com.example.backend.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public HttpEntity<?> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @Override
    public HttpEntity<?> postCategories(CategoryReq categoryReq) {
        Category category = Category.builder()
                .title(categoryReq.getTitle())
                .build();
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(categoryRepository.save(savedCategory));
    }

    @Override
    public void deleteCategories(UUID id) {
        categoryRepository.deleteById(id);
    }
}
