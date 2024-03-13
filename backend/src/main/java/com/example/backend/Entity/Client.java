package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID telegramId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Territory territory;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Currier> courier;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    private String tin;
    @Column(nullable = false)
    private String companyName;
    private String referencePoint;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private double latitude;
    private Boolean active;
    @Column(nullable = false)
    private Boolean botActive;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp registrationDate;
    private LocalDateTime insertionTime;
    @ManyToOne(fetch = FetchType.EAGER)
    private CustomerCategory category;
    @OneToOne(fetch = FetchType.EAGER)
    private User user;
}


