package com.example.backend.Projection;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.Product;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface OrderedProductProjection {
    UUID getId();
    @Value("#{@productRepository.findByProductId(target.productId)}")
    ProductProjection getProduct();

    Integer getCount();
}
