package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "territory")
@Entity
public class Territory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String code;
    @Column(nullable = false)
    private Boolean active;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private double latitude;
    private LocalDateTime insertionTime;
    private boolean archive;
}
