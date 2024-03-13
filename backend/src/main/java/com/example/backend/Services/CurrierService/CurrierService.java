package com.example.backend.Services.CurrierService;

import com.example.backend.DTO.CurrierDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CurrierService {
    HttpEntity<?> getCarriers();

    HttpEntity<?> postCurrier(CurrierDTO currierDTO);

    HttpEntity<?> editCurrier(UUID id, CurrierDTO currierDTO);

    void changeStatus(UUID id);
}
