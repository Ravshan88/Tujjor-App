package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Table(name = "customer_category")
@Entity
@Builder
@NoArgsConstructor
public class CustomerCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String code;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Boolean active;
    @ManyToOne
    private Attachment attachment;
    @CreationTimestamp
    private LocalDateTime insertion_time;
    @Column(nullable = false)
    private Boolean archive;

    public CustomerCategory(Integer id, String region, String code, String name, String description, Boolean active,Boolean archive) {
        this.id = id;
        this.region = region;
        this.code = code;
        this.name = name;
        this.description = description;
        this.active = active;
        this.archive=archive;
    }
}
