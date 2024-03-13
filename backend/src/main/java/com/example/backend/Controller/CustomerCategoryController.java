package com.example.backend.Controller;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer-category")
public class CustomerCategoryController {

    private final CustomerCategoryService categoryService;
    private final UniversalServiceFilter universalService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalService.pagination(page, limit, request, "customer_category");
    }

    @GetMapping("/getArchives")
    public HttpEntity<?> getArchives(){
        return categoryService.getArchives();
    }
    @GetMapping()
    public HttpEntity<?> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping()
    public HttpEntity<?> saveCustomerCategory(@Valid @RequestParam String data,
                                              @RequestParam(required = false) MultipartFile photo,
                                              @RequestParam String prefix) throws IOException {
        CustomerCategoryDTO categoryDTO = objectMapper.readValue(data, CustomerCategoryDTO.class);
        return categoryService.addCategory(categoryDTO, photo, prefix);
    }

    @PutMapping("{id}")
    public void updateCategory(@Valid @RequestParam String data,
                               @RequestParam(required = false) MultipartFile photo,
                               @RequestParam String prefix, @PathVariable Integer id) throws IOException {
        CustomerCategoryDTO categoryDTO = objectMapper.readValue(data, CustomerCategoryDTO.class);
        categoryService.updateCategory(id, categoryDTO, photo, prefix);
    }
    @PutMapping("/archive/{id}")
    public HttpEntity<?> archiveCategory(@PathVariable Integer id,@RequestParam boolean archive){
        return categoryService.archiveCategory(id,archive);
    }
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Integer id){
        categoryService.deleteItem(id);
    }
    @GetMapping("/telegram")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public HttpEntity<?> getCategoriesForTelegram() {
        return categoryService.getCategoriesForTelegram();
    }

    ;
}