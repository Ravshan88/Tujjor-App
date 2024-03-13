package com.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrierDTO {

    @NotNull(message = "firstName cannot be null")
    @NotBlank(message = "firstName cannot be empty")
    private String firstname;

    @NotNull(message = "lastName cannot be null")
    @NotBlank(message = "lastName cannot be empty")
    private String lastname;

    @NotNull(message = "phone cannot be null")
    @NotBlank(message = "phone cannot be empty")
    private String phone;

    @NotNull(message = "longitude cannot be null")
    private Double longitude;

    @NotNull(message = "latitude cannot be null")
    private Double latitude;

    private Boolean active;

    @NotNull(message = "password cannot be null")
    @NotBlank(message = "password cannot be empty")
    private String password;
    private String username;


    @NotNull(message = "territory cannot be null")
    @NotBlank(message = "territory cannot be empty")
    private String territoryIds;

}
