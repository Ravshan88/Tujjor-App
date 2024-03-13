package com.example.backend.Services.CatalogService;

import com.example.backend.DTO.CatalogDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CatalogService {
    HttpEntity<?> getCatalogs();
    HttpEntity<?> getCatalogsWithFilter(String catalogQuickSearch);
    HttpEntity<?> saveCatalog(CatalogDTO catalogData);
    HttpEntity<?> getCatalogProducts(UUID catalogId);
    HttpEntity<?> deleteCatalogProduct(UUID catalogId, UUID productId);
    HttpEntity<?> getCatalogProductsWithFilter(JsonNode filterParam);
    HttpEntity<?> getCatalogProduct(UUID productId);
    HttpEntity<?> getCatalogProductsForAddProductPage(JsonNode filterParam);
    HttpEntity<?> addProductToCatalog(UUID catalogId, UUID productId);
}
