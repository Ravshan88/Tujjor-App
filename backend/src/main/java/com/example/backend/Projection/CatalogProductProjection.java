package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface CatalogProductProjection {
    @Value("#{target.catalog_id}")
    String getCatalogId();
    @Value("#{target.products_id}")
    String getProductId();
    @Value("#{target.title}")
    String getTitle();
    @Value("#{target.attachment_id}")
    String getAttachmentId();
}
