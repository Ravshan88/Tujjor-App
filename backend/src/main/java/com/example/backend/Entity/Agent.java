package com.example.backend.Entity;


import com.example.backend.Projection.ExcelExportable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "agents")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Agent implements ExcelExportable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String username;
    private Boolean ownDealer;
    private UUID telegramId;
    @OneToOne(fetch = FetchType.EAGER)
    private User user;
}
