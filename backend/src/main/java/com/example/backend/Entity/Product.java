package com.example.backend.Entity;
import com.example.backend.Projection.ExcelExportable;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title;
    private Double price;
    private Integer count;
    private Boolean free;
    private LocalDateTime insertionTime;
    @ManyToOne(fetch = FetchType.EAGER)
    private Dealer dealer;
    @ManyToOne
    private ProductCategory category;
    @ManyToOne
    private Attachment attachment;
}
