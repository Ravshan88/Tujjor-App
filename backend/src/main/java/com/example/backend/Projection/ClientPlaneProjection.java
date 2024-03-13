package com.example.backend.Projection;

import java.time.LocalDate;
import java.util.UUID;

public interface ClientPlaneProjection {
    UUID getId();
    Integer getAmount();
    LocalDate getDate();
}