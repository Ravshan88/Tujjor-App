package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class ClientDTO {
    @NotNull(message = "TerritoryId Not Should Be Null!")
    private UUID territoryId;
    private Integer categoryId;
    private String couriersId;
    private String name;
    private String companyName;
    private String referencePoint;
    @NotBlank(message = "address is empty!")
    @NotNull(message = "address should not be null")
    private String address;
    @NotBlank(message = "phone is empty!")
    @NotNull(message = "phone should not be null")
    private String phone;
    private Boolean active;
    private String tin;
    private double longitude;
    private double latitude;
    private String password;
}
