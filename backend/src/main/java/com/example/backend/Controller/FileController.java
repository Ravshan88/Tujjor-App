package com.example.backend.Controller;

import com.example.backend.Services.AttachmentService.AttachmentService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final AttachmentService attachmentService;

    @PostMapping("/upload")
    public HttpEntity<?> uploadFile(@RequestBody MultipartFile photo, @RequestParam String prefix) throws IOException {
        return attachmentService.uploadFile(photo, prefix);
    }

    @GetMapping("/getFile/{id}")
    public void getFile(@PathVariable UUID id, HttpServletResponse response) throws IOException {
        attachmentService.getFile(id, response);
    }
}
