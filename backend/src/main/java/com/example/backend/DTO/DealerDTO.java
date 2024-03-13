package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DealerDTO {
    private String fullName;
    private String phoneNumber;
    private String password;
    private String address;
    private String company;
    private String agentsId;
    private Boolean ownAgents;
    private Boolean partnership;
}
