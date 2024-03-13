package com.example.backend.Entity;

import com.example.backend.Projection.ExcelExportable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "company")
@Builder
public class Company implements ExcelExportable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String companyName;
    @OneToOne(fetch = FetchType.EAGER)
    private User superVisor;
    @Column(nullable = false)
    private String supportPhone;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String address;
}
