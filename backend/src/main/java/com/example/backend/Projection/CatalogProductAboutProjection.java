package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface CatalogProductAboutProjection {
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
}
