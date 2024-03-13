package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TerritoryDTO {
    @NotNull(message = "region cannot be null")
    @NotBlank(message = "region cannot be empty")
    private String region;
    @NotNull(message = "name cannot be null")
    @NotBlank(message = "name cannot be empty")
    private String name;
    @NotNull(message = "code cannot be null")
    @NotBlank(message = "code cannot be empty")
    private String code;
    @NotNull(message = "active cannot be null")
    private Boolean active;
    @NotNull(message = "longitude cannot be null")
    private double longitude;
    @NotNull(message = "latitude cannot be null")
    private double latitude;
}
