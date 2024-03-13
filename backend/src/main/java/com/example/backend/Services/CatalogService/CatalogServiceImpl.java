package com.example.backend.Services.CatalogService;

import com.example.backend.DTO.CatalogDTO;
import com.example.backend.Entity.Catalog;
import com.example.backend.Projection.CatalogProductProjection;
import com.example.backend.Repository.CatalogRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CatalogServiceImpl implements CatalogService {
    private final CatalogRepository catalogRepository;

    @Override
    public HttpEntity<?> getCatalogs() {
        return ResponseEntity.ok(catalogRepository.getCatalogs());
    }

    @Override
    public HttpEntity<?> getCatalogsWithFilter(String catalogQuickSearch) {
        return ResponseEntity.ok(catalogRepository.getCatalogsWithFilter(catalogQuickSearch));
    }

    @Override
    public HttpEntity<?> saveCatalog(CatalogDTO catalogData) {
        catalogRepository.save(generateCatalogFromData(catalogData));
        return ResponseEntity.ok("catalog saved successfully");
    }

    @Override
    public HttpEntity<?> getCatalogProducts(UUID catalogId) {
        return ResponseEntity.ok(catalogRepository.getCatalogProducts(catalogId));
    }

    @Override
    public HttpEntity<?> deleteCatalogProduct(UUID catalogId, UUID productId) {
        catalogRepository.deleteCatalogProduct(catalogId, productId);
        return ResponseEntity.ok("deleted successfully");
    }

    public HttpEntity<?> getCatalogProductsWithFilter(JsonNode filterParam) {
        String selectedProductCategoryId = getStringOrNull(filterParam, "selectedProductCategory");
        String productName = getStringOrNull(filterParam, "catalogProductName");
        String currentCatalogStr = getStringOrNull(filterParam, "currentCatalog");
        UUID currentCatalog = currentCatalogStr != null ? UUID.fromString(currentCatalogStr) : null;
        return ResponseEntity.ok(catalogRepository.getCatalogProductsWithFilter(productName.replace("\"", ""), selectedProductCategoryId.replace("\"", ""), currentCatalog));
    }

    private String getStringOrNull(JsonNode jsonNode, String fieldName) {
        if (jsonNode.has(fieldName)) {
            return jsonNode.get(fieldName).asText();
        }
        return null;
    }


    @Override
    public HttpEntity<?> getCatalogProduct(UUID productId) {
        return ResponseEntity.ok(catalogRepository.getCatalogProduct(productId));
    }

    @Override
    public HttpEntity<?> getCatalogProductsForAddProductPage(JsonNode filterParam) {
        String selectedProductCategoryId = getStringOrNull(filterParam, "selectedProductCategory");
        String productName = getStringOrNull(filterParam, "catalogProductName");
        String currentCatalogStr = getStringOrNull(filterParam, "currentCatalog");
        UUID currentCatalog = currentCatalogStr != null ? UUID.fromString(currentCatalogStr) : null;
        return ResponseEntity.ok(catalogRepository.getCatalogProductsForAddCatalogProduct(productName.replace("\"", ""), selectedProductCategoryId.replace("\"", ""), currentCatalog));
    }

    @Override
    public HttpEntity<?> addProductToCatalog(UUID catalogId, UUID productId) {
        catalogRepository.addProductToCatalog(catalogId, productId);
        return ResponseEntity.ok("added successfully");
    }


    private static Catalog generateCatalogFromData(CatalogDTO catalogData) {
        return Catalog
                .builder()
                .name(catalogData.getName())
                .build();
    }
}
