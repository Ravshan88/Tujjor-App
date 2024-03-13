package com.example.backend.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductReq {
    private String title;
    private String categoryId;
    private Integer price;
    private Integer count;
    private Boolean free;
}
