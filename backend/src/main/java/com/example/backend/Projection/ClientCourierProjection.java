package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface ClientCourierProjection {
    @Value("#{target.full_name}")
    String getFullName();
    @Value("#{target.phone}")
    String getPhone();
}
