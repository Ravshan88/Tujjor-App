package com.example.backend.Services.SmsService;

import com.example.backend.DTO.SmsFiltersDTO;
import com.example.backend.DTO.SmsServiceDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;

public interface SmsService {
    void sendSms(SmsServiceDTO formDto, SmsFiltersDTO filtersDTO, MultipartFile file);
}
