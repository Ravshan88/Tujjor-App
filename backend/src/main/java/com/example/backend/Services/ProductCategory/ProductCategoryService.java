package com.example.backend.Services.ProductCategory;

import com.example.backend.DTO.ProductCategoryDTO;
import com.example.backend.Entity.ProductCategory;

import java.util.List;
import java.util.UUID;

public interface ProductCategoryService {
    List<ProductCategory> getProductCategories();
    ProductCategory addProductCategory(ProductCategoryDTO productCategoryData);
    ProductCategory editProductCategory(ProductCategoryDTO productCategoryData, UUID productCategoryId);
    String deleteProductCategory(UUID productCategoryId);
}
