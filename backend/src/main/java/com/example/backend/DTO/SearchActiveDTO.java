package com.example.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchActiveDTO {
    @NotNull(message = "active cannot be null")
    private String active;
    @NotNull(message = "search cannot be null")
    private String quickSearch;
}
