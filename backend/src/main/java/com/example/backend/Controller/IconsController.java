package com.example.backend.Controller;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.DTO.IconsDTO;
import com.example.backend.Services.IconsService.IconsService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;


@RestController
@RequestMapping("/api/icons")
@RequiredArgsConstructor
public class IconsController {
    private final IconsService iconsService;
    private final UniversalServiceFilter universalServiceFilter;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
//    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getIcons() {
        return iconsService.getIcons();
    }


    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalServiceFilter.pagination(page, limit, request, "icons");
    }

    @GetMapping("/table")
    public HttpEntity<?> getIconsForTable() {
        return iconsService.getIconsForTable();
    }


    @SneakyThrows
    @PostMapping
    public HttpEntity<?> addIcon(@RequestParam(required = false) MultipartFile photo,
                                 @RequestParam String data,
                                 @RequestParam String prefix) {
        IconsDTO iconsDTO = objectMapper.readValue(data, IconsDTO.class);
        return iconsService.addIcon(photo, prefix, iconsDTO);
    }

    @SneakyThrows
    @PutMapping
    public HttpEntity<?> editIcon(@RequestParam(required = false) MultipartFile photo,
                                  @RequestParam String data,
                                  @RequestParam String prefix) {
        IconsDTO iconsDTO = objectMapper.readValue(data, IconsDTO.class);
        return iconsService.editIcon(photo, prefix, iconsDTO);
    }

    @PatchMapping("/{id}")
    public void changeStatus(@PathVariable UUID id) {
        iconsService.changeStatus(id);
    }

}
