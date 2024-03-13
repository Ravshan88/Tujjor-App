package com.example.backend.Services.Universal;

import com.example.backend.Payload.Request.FilterData;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;

public interface UniversalServiceFilter {
    FilterData generateFilterDataFromRequest(HttpServletRequest request);

    JsonNode wrapToObject(HttpServletRequest request);

    boolean validateParams(Integer page, String limit);
     HttpEntity<?> pagination(Integer page,String limit,HttpServletRequest request,String component);
}
