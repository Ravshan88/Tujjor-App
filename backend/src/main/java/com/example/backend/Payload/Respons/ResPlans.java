package com.example.backend.Payload.Respons;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResPlans {
    private UUID id;
    private Integer amount;
    private LocalDate date;
}
