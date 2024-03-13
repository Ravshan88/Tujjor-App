package com.example.backend.Controller;

import com.example.backend.DTO.CurrierDTO;
import com.example.backend.DTO.ProductDTO;
import com.example.backend.Repository.ProductCategoryRepository;
import com.example.backend.Services.ProductService.ProductService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final UniversalServiceFilter universalServiceFilter;
    private final ProductCategoryRepository productCategoryRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalServiceFilter.pagination(page, limit, request, "product");
    }

    @GetMapping
    public HttpEntity<?> getProducts() {
        return productService.getProducts();
    }

    @SneakyThrows
    @PostMapping
    public HttpEntity<?> postProduct(@RequestParam(required = false) MultipartFile photo,
                                     @RequestParam String data,
                                     @RequestParam String prefix) {
        ProductDTO productDTO = objectMapper.readValue(data, ProductDTO.class);
        return productService.postProduct(productDTO, prefix, photo);
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public HttpEntity<?> editProduct(@RequestParam(required = false) MultipartFile photo,
                                     @RequestParam String data,
                                     @RequestParam String prefix, @PathVariable UUID id) {
        ProductDTO productDTO = objectMapper.readValue(data, ProductDTO.class);
        return productService.editProduct(id, productDTO, prefix, photo);
    }

    @GetMapping("/category")
    public HttpEntity<?> getCategory() {
        return ResponseEntity.ok(productCategoryRepository.findAll());
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getProduct(@PathVariable UUID id) {
        return productService.getProduct(id);
    }

}
