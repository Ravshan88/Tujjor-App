package com.example.backend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String status;
    @ManyToOne(fetch = FetchType.EAGER)
    private Client client;
    private LocalDateTime createdAt;
    private String phoneNumber;
    private String clientName;
    private double longitude;
    private double latitude;
    private String description;
    private boolean delivering;
}