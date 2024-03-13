package com.example.backend.Controller;

import com.example.backend.Services.CompanyService.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    @GetMapping
    HttpEntity<?> getCompanies() {
      return ResponseEntity.ok(companyService.getCompanies());
    };

}
