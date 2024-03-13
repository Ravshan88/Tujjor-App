package com.example.backend.Services.ProductCategory;

import com.example.backend.DTO.ProductCategoryDTO;
import com.example.backend.Entity.ProductCategory;
import com.example.backend.Repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    @Override
    public List<ProductCategory> getProductCategories() {
        return productCategoryRepository.findAll();
    }

    @Override
    public ProductCategory addProductCategory(ProductCategoryDTO productCategoryData) {
        return productCategoryRepository.save(generateProductCategoryFromData(productCategoryData));
    }

    @Override
    public ProductCategory editProductCategory(ProductCategoryDTO productCategoryData, UUID productCategoryId) {
        ProductCategory productCategory = productCategoryRepository.findById(productCategoryId).orElseThrow();
        productCategory.setName(productCategoryData.getName());
        productCategoryRepository.save(productCategory);
        return productCategory;
    }

    @Override
    public String deleteProductCategory(UUID productCategoryId) {
        productCategoryRepository.deleteById(productCategoryId);
        return "Product category deleted";
    }

    private static ProductCategory generateProductCategoryFromData(ProductCategoryDTO productCategoryData) {
        return ProductCategory
                .builder()
                .insertionTime(LocalDateTime.now())
                .name(productCategoryData.getName())
                .insertionTime(LocalDateTime.now())
                .build();
    }
}
