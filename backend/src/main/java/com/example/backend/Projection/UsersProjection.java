package com.example.backend.Projection;

import java.sql.Timestamp;
import java.util.UUID;

public interface UsersProjection {
    Timestamp getCreatedAt();

    Timestamp getUpdatedAt();

    UUID getId();

    String getUsername();
}
