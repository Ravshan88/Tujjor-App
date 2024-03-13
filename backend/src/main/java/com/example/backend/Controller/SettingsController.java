package com.example.backend.Controller;

import com.example.backend.Services.SettingsService.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {
    private final SettingsService service;
    @GetMapping
    public HttpEntity<?> getAllSettings() {
    return service.getAllSettings();
    };
}
