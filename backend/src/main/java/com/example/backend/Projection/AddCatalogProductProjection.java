package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface AddCatalogProductProjection {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.attachment_id}")
    String getAttachmentId();
    @Value("#{target.title}")
    String getTitle();
    @Value("#{target.price}")
    String getPrice();
    @Value("#{target.category}")
    String getCategory();
    @Value("#{target.is_in_catalog}")
    Boolean getIsInCatalog();
}
