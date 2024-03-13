package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class IconsDTO {
    private UUID id;
    private String name;
    private UUID attachmentId;
    private boolean deletePhoto;
    private String attachmentName;
}
