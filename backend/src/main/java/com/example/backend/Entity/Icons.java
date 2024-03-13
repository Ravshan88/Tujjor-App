package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Icons {
    @Id
    private UUID id;
    @ManyToOne
    private Attachment attachment;
    @Column(unique = true)
    private String name;
    private LocalDateTime insertionTime;
}
