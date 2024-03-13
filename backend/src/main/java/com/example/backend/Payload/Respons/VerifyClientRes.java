package com.example.backend.Payload.Respons;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyClientRes {
    private String status;
    private UUID clientId;
}
