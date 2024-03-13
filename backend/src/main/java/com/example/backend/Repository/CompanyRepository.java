package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Integer> {
    Company findByCompanyName(String name);
}