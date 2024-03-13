package com.example.backend.Services.IconsService;

import com.example.backend.DTO.IconsDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface IconsService {
    HttpEntity<?> getIcons();

    HttpEntity<?> addIcon(MultipartFile photo, String prefix,IconsDTO iconsDTO);

    HttpEntity<?> getIconsForTable();

    HttpEntity<?> editIcon(MultipartFile photo, String prefix, IconsDTO iconsDTO);

    void changeStatus(UUID id);
}
