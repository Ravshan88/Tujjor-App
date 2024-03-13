package com.example.backend.Services.IconsService;

import com.example.backend.DTO.IconsDTO;
import com.example.backend.Entity.Attachment;
import com.example.backend.Entity.Icons;
import com.example.backend.Repository.AttachmentRepository;
import com.example.backend.Repository.IconsRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class IconsServiceImpl implements IconsService {
    private final AttachmentRepository attachmentRepo;
    private final IconsRepo iconsRepo;
    @Value("${files.path}")
    private String folderPath;

    @Override
    public HttpEntity<?> getIcons() {
        return ResponseEntity.ok(iconsRepo.findAllBYAttachmentId());
    }


    @SneakyThrows
    @Override
    public HttpEntity<?> addIcon(MultipartFile photo, String prefix, IconsDTO iconsDTO) {
        UUID id = UUID.randomUUID();
        String fileName = id + "_" + photo.getOriginalFilename();
        String filePath = folderPath + prefix + "/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();

        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        Attachment savedAttachment = attachmentRepo.save(new Attachment(id, prefix, fileName));
        iconsRepo.save(new Icons(UUID.randomUUID(), savedAttachment, iconsDTO.getName(),LocalDateTime.now()));
        return ResponseEntity.ok("Icon successfully saved");
    }

    @Override
    public HttpEntity<?> getIconsForTable() {
        Page<Icons> filteredData = iconsRepo.findAllByNameContainingIgnoreCaseOrderByInsertionTimeDesc("", Pageable.unpaged());
        return ResponseEntity.ok(filteredData.getContent());
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editIcon(MultipartFile photo, String prefix, IconsDTO iconsDTO) {
        Icons existingIcon = iconsRepo.findById(iconsDTO.getId()).orElseThrow();
        existingIcon.setName(iconsDTO.getName());
        if (!iconsDTO.isDeletePhoto()) {
            existingIcon.setAttachment(attachmentRepo.findById(iconsDTO.getAttachmentId()).get());
        } else if (photo != null && !photo.isEmpty() && iconsDTO.isDeletePhoto()) {

            String folderPathToDelete = folderPath + prefix + "/" + iconsDTO.getAttachmentName();
            File fileToDelete = new File(folderPathToDelete);
            if (fileToDelete.exists()) {
                boolean delete = fileToDelete.delete();
            } else {
                System.err.println("File does not exist.");
            }

            UUID attaUuid = UUID.randomUUID();
            String fileName = attaUuid + "_" + photo.getOriginalFilename();
            String filePath = folderPath + prefix + "/" + fileName;
            File file = new File(filePath);
            file.getParentFile().mkdirs();
            try (OutputStream outputStream = new FileOutputStream(file)) {
                FileCopyUtils.copy(photo.getInputStream(), outputStream);
            }
            existingIcon.setAttachment(attachmentRepo.save(new Attachment(attaUuid, prefix, fileName)));
        }
        iconsRepo.save(existingIcon);
        return ResponseEntity.ok("Icon successfully edited");
    }

    @Override
    public void changeStatus(UUID id) {
        Optional<Icons> icon = iconsRepo.findById(id);
        if (icon.isPresent()) {
            Icons currentIcon = icon.get();
            iconsRepo.save(currentIcon);
        }
    }


}
