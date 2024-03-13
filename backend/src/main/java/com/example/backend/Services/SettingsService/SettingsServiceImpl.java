package com.example.backend.Services.SettingsService;

import com.example.backend.Repository.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService{
    private final SettingsRepository settingsRepository;

    @Override
    public HttpEntity<?> getAllSettings() {
        return ResponseEntity.ok(settingsRepository.findAll());
    }
}
