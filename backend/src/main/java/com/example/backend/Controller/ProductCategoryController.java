package com.example.backend.Controller;

import com.example.backend.DTO.DealerDTO;
import com.example.backend.DTO.ProductCategoryDTO;
import com.example.backend.Services.DealerService.DealerService;
import com.example.backend.Services.ProductCategory.ProductCategoryService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/product-category")
@RequiredArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;
    private final UniversalServiceFilter universalService;

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalService.pagination(page, limit, request, "product-category");
    }

    @GetMapping
    public HttpEntity<?> getProductCategories() {
        return ResponseEntity.ok(productCategoryService.getProductCategories());
    }

    @PostMapping
    public HttpEntity<?> saveDealer(@RequestBody ProductCategoryDTO productCategoryDTO) {
        return ResponseEntity.ok(productCategoryService.addProductCategory(productCategoryDTO));
    }

    @PutMapping("/{productCategoryId}")
    public HttpEntity<?> putDealer(@PathVariable("productCategoryId") String productCategoryId, @RequestBody ProductCategoryDTO productCategoryDTO) {
        return ResponseEntity.ok(productCategoryService.editProductCategory(productCategoryDTO, UUID.fromString(productCategoryId)));
    }

    @DeleteMapping("/{productCategoryId}")
    public HttpEntity<?> deleteDealer(@PathVariable("productCategoryId") String productCategoryId) {
        return ResponseEntity.ok(productCategoryService.deleteProductCategory(UUID.fromString(productCategoryId)));
    }
}
