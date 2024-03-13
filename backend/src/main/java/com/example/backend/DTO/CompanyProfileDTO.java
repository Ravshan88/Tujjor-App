package com.example.backend.DTO;

import com.example.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyProfileDTO {
    private String companyName;
    private User superVisor;
    private String supportPhone;
    private String email;
    private String region;
    private String address;
}
