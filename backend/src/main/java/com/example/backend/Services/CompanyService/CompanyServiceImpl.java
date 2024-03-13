package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    @Override
    public List<Company> getCompanies() {
        return companyRepository.findAll();
    }

}
