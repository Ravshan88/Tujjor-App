package com.example.backend.Projection;

import com.example.backend.Entity.Attachment;
import com.example.backend.Entity.ProductCategory;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ProductProjection extends ExcelExportable {
    UUID getId();

    Integer getCount();

    Boolean getFree();

    Double getPrice();

    LocalDateTime getInsertionTime();

    Attachment getAttachment();

    ProductCategory getCategory();

    String getTitle();

//    @Value("#{@dealerRepository.findById(target.dealerId)}")
    DealerProjectionForProduct getDealer();

}
