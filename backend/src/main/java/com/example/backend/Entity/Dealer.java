package com.example.backend.Entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
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
@Entity
@Builder
public class Dealer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String company;
    @OneToOne(fetch = FetchType.EAGER)
    private User user;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Agent> agents;
    private Boolean ownAgents;
    private Boolean partnership;
    private UUID telegramId;
    private LocalDateTime insertionTime;
    @Column(nullable = false)
    private Boolean botActive;
}
