package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface CatalogProjection {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.count}")
    String getCount();
}
