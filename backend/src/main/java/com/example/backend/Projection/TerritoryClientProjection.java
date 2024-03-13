package com.example.backend.Projection;

import java.util.UUID;

public interface TerritoryClientProjection {
    UUID getId();
    String getName();
    String getCode();
    String getRegion();
    Boolean getActive();

}
