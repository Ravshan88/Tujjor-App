package com.example.backend.Payload.Request;

import com.example.backend.Entity.Product;
import jakarta.annotation.security.DenyAll;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@DenyAll
@NoArgsConstructor
public class OrderRowReq {
    private Product product;
    private Integer count;
}
