package com.example.backend.Controller;

import com.example.backend.DTO.SmsFiltersDTO;
import com.example.backend.DTO.SmsServiceDTO;
import com.example.backend.Services.SmsService.SmsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class SmsController {
    private final SmsService service;


    @SneakyThrows
    @PostMapping("/send")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> sendSms(@RequestPart("form") String formJson,@RequestPart("filters") String filtersJson, @RequestPart(value = "file",required = false) MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        SmsServiceDTO  formDTO = objectMapper.readValue(formJson, SmsServiceDTO.class);
        SmsFiltersDTO filtersDTO = objectMapper.readValue(filtersJson, SmsFiltersDTO.class);
        service.sendSms(formDTO, filtersDTO, file);
        return ResponseEntity.ok("SUCCESSFULLY_SEND");
    }
}
