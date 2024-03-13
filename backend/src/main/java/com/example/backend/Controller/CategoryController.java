package com.example.backend.Controller;


import com.example.backend.Payload.Request.CategoryReq;
import com.example.backend.Services.CategoryService.CategoryService;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public HttpEntity<?> getCategories(){
        return categoryService.getCategories();
    }
    @PostMapping
    public HttpEntity<?> postCategories(@RequestBody CategoryReq categoryReq){
        return categoryService.postCategories(categoryReq);
    }
    @DeleteMapping("{id}")
    public void deleteCategories(@PathVariable UUID id){
        categoryService.deleteCategories(id);
    }

}
