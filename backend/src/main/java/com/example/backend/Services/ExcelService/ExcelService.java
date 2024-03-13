package com.example.backend.Services.ExcelService;

import com.example.backend.Payload.Request.FilterData;
import com.example.backend.Projection.ExcelExportable;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ExcelService {
    ResponseEntity<Resource> getExcel(HttpServletRequest request, String[] headers, String component, HttpServletResponse response);
     void getFilteredContentData(String component, List<ExcelExportable> dataOfExcel, FilterData filters, Pageable pageable);
}
