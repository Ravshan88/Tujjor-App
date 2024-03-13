package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

public interface ProductCategoryProjection extends ExcelExportable{
    String getId();
    String getName();
}
