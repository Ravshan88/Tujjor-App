package com.example.backend.Services.AttachmentService;

import com.example.backend.Entity.Attachment;
import com.example.backend.Repository.AttachmentRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {
    private final AttachmentRepository attachmentRepo;
    @Value("${files.path}")
    private String folderPath;
    @Override
    public HttpEntity<?> uploadFile(MultipartFile photo, String prefix) throws IOException {
        UUID id = UUID.randomUUID();
        String fileName = id + "_" + photo.getOriginalFilename();
        String filePath = folderPath + prefix + "/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        Attachment attachment = new Attachment(id, prefix, fileName);
        attachmentRepo.save(attachment);
        return ResponseEntity.ok(id);
    }

    @Override
    public void getFile(UUID id, HttpServletResponse response) throws IOException {
        Optional<Attachment> attachmentOptional = attachmentRepo.findById(id);
        if (attachmentOptional.isPresent()) {
            Attachment attachment = attachmentOptional.get();
            String prefix = attachment.getPrefix();
            String name = attachment.getName();
            String path = folderPath + prefix + "/" + name;
            FileCopyUtils.copy(new FileInputStream(path), response.getOutputStream());
        }
    }

    public static String createFile(MultipartFile photo, String prefix, UUID id, String folderPath) throws IOException {
        String fileName = id + "_" + photo.getOriginalFilename();
        String filePath = folderPath + prefix + "/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        return fileName;
    }
    public static void deleteFileFromFolder(String prefix, String attachmentName, String folderPath) {
        String folderPathToDelete = folderPath + prefix + "/" + attachmentName;
        File fileToDelete = new File(folderPathToDelete);
        if (fileToDelete.exists()) {
            boolean delete = fileToDelete.delete();
        } else {
            System.err.println("File does not exist.");
        }
    }

}
