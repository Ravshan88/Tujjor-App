package com.example.backend.Controller;

import com.example.backend.DTO.CatalogDTO;
import com.example.backend.Services.CatalogService.CatalogService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class CatalogController {
    private final CatalogService catalogService;
    private final UniversalServiceFilter universalServiceFilter;

    @GetMapping
    public HttpEntity<?> getCatalogs() {
        return catalogService.getCatalogs();
    }

    @GetMapping("/filter/{catalogQuickSearch}")
    public HttpEntity<?> getCatalogsWithFilter(@PathVariable String catalogQuickSearch) {
        return catalogService.getCatalogsWithFilter(catalogQuickSearch);
    }

    @PostMapping
    public HttpEntity<?> saveCatalog(@RequestBody CatalogDTO catalogDTO) {
        return catalogService.saveCatalog(catalogDTO);
    }

    @GetMapping("/{catalogId}")
    public HttpEntity<?> getCatalogProducts(@PathVariable String catalogId) {
        return catalogService.getCatalogProducts(UUID.fromString(catalogId));
    }

    @GetMapping("/product-filter")
    public HttpEntity<?> getCatalogProductsWithFilter(HttpServletRequest request) {
        return catalogService.getCatalogProductsWithFilter(universalServiceFilter.wrapToObject(request));
    }

    @GetMapping("/product-about/{productId}")
    public HttpEntity<?> getCatalogProduct(@PathVariable String productId) {
        return catalogService.getCatalogProduct(UUID.fromString(productId));
    }

    @GetMapping("/product-add/products")
    public HttpEntity<?> getCatalogProductsForAddProductPage(HttpServletRequest request) {
        return catalogService.getCatalogProductsForAddProductPage(universalServiceFilter.wrapToObject(request));
    }

    @PostMapping("/product-add/{catalogId}/{productId}")
    public HttpEntity<?> addProductToCatalog(@PathVariable String catalogId, @PathVariable String productId) {
        return catalogService.addProductToCatalog(UUID.fromString(catalogId), UUID.fromString(productId));
    }

    @DeleteMapping("/{catalogId}/{productId}")
    public HttpEntity<?> deleteCatalogProduct(@PathVariable String catalogId, @PathVariable String productId) {
        return catalogService.deleteCatalogProduct(UUID.fromString(catalogId), UUID.fromString(productId));
    }
}
