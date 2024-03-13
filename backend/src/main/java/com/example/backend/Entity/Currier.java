package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Currier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String showPassword;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double latitude;

    private LocalDateTime insertionTime;

    private Boolean active;

    private String username;

    private UUID telegramId;
    private boolean archive;

    @OneToMany
    private List<Territory> territory;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

}
