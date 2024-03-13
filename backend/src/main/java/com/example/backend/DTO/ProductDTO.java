package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductDTO {
    @NotNull(message = "Title cannot be null")
    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotNull(message = "Price cannot be null")
    private Double price;

    @NotNull(message = "Count cannot be null")
    private Integer count;

    private Boolean free;

    @NotNull(message = "Category ID cannot be null")
    private UUID categoryId;
    private UUID attachmentId;
    private boolean deletePhoto;
    private String attachmentName;
    private UUID dealerId;
}
