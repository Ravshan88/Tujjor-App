package com.example.backend.Services.CategoryService;

import com.example.backend.Payload.Request.CategoryReq;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CategoryService {
    HttpEntity<?> getCategories();
    HttpEntity<?> postCategories(CategoryReq categoryReq);
    void deleteCategories(UUID id);
}
