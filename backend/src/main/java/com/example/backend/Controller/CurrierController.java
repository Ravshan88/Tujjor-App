package com.example.backend.Controller;

import com.example.backend.DTO.CurrierDTO;
import com.example.backend.Services.CurrierService.CurrierService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/currier")
public class CurrierController {
    private final CurrierService currierService;
    private final UniversalServiceFilter universalServiceFilter;


    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalServiceFilter.pagination(page, limit, request, "currier");
    }

    @GetMapping
    public HttpEntity<?> getCarriers() {
        return currierService.getCarriers();
    }

    @PostMapping
    public HttpEntity<?> postCurrier(@Valid @RequestBody CurrierDTO currierDTO) {
        return currierService.postCurrier(currierDTO);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editCurrier(@Valid @RequestBody CurrierDTO currierDTO, @PathVariable UUID id) {
        return currierService.editCurrier(id, currierDTO);
    }

    @PatchMapping("/{id}")
    private void changeStatus(@PathVariable UUID id) {
        currierService.changeStatus(id);
    }
}
