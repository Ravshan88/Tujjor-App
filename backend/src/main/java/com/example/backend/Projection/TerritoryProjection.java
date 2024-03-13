package com.example.backend.Projection;


import java.util.UUID;

public interface TerritoryProjection extends ExcelExportable{

     UUID getId();

     String getRegion();

     String getName();

     Boolean getActive();

     Double getLatitude();

     Double getLongitude();

     String getCode();
}
