package com.example.backend.Services.ProductService;

import com.example.backend.DTO.ProductDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ProductService {
    HttpEntity<?> getProduct(UUID id);

    HttpEntity<?> getProducts();

    HttpEntity<?> postProduct(ProductDTO productDTO, String prefix, MultipartFile photo);

    HttpEntity<?> editProduct(UUID id, ProductDTO productDTO, String prefix, MultipartFile photo);
}
