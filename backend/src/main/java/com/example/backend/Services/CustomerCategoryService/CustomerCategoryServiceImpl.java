package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Entity.Attachment;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Repository.AttachmentRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.example.backend.Services.AttachmentService.AttachmentServiceImpl.createFile;
import static com.example.backend.Services.AttachmentService.AttachmentServiceImpl.deleteFileFromFolder;


@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepository customerCategoryRepository;
    private final AttachmentRepository attachmentRepo;


    @Value("${files.path}")
    private String folderPath;
    @Override
    public HttpEntity<?> getArchives() {
        List<CustomerCategory> allByArchive = customerCategoryRepository.findAllByArchive(true);
        return ResponseEntity.ok(allByArchive);
    }
    @Override
    public void deleteItem(Integer id) {
        customerCategoryRepository.deleteById(id);
    }
    @Override
    public HttpEntity<?> archiveCategory(Integer id,boolean archive) {
        CustomerCategory archiveCategory = customerCategoryRepository.findById(id).get();
        archiveCategory.setArchive(archive);
        CustomerCategory saved = customerCategoryRepository.save(archiveCategory);
        return ResponseEntity.ok(saved);
    }

    @Override
    public HttpEntity<?> addCategory(CustomerCategoryDTO categoryDTO, MultipartFile photo, String prefix) throws IOException {
        Attachment attachment = null;
        if (categoryDTO.getAttachmentId() != null) {
            attachment = attachmentRepo.findById(categoryDTO.getAttachmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Attachment not found"));
        } else if (photo != null && !photo.isEmpty()) {
            UUID id = UUID.randomUUID();
            String fileName = createFile(photo, prefix, id, folderPath);
            attachment = new Attachment(id, "/categoryIcons", fileName);
            attachmentRepo.save(attachment);
        }
        CustomerCategory category = generateNewCustomerCategory(categoryDTO, attachment);
        return ResponseEntity.ok(customerCategoryRepository.save(category));
    }

    @Override
    public void updateCategory(Integer id, CustomerCategoryDTO categoryDTO, MultipartFile photo, String prefix) throws IOException {
        CustomerCategory existingCategory = customerCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Customer category not found"));
        existingCategory.setRegion(categoryDTO.getRegion());
        existingCategory.setCode(categoryDTO.getCode());
        existingCategory.setDescription(categoryDTO.getDescription());
        existingCategory.setActive(categoryDTO.isActive());
        existingCategory.setName(categoryDTO.getName());
        updatePhoto(categoryDTO, photo, prefix, existingCategory);
    }

    private void updatePhoto(CustomerCategoryDTO categoryDTO, MultipartFile photo, String prefix, CustomerCategory existingCategory) throws IOException {
        if (!categoryDTO.isDeletePhoto()) {
            existingCategory.setAttachment(attachmentRepo.findById(categoryDTO.getAttachmentId()).get());
        } else if (photo != null && !photo.isEmpty()) {
            deleteFileFromFolder(prefix, categoryDTO.getAttachmentName(), folderPath);
            UUID attaUuid = UUID.randomUUID();
            String fileName = createFile(photo, prefix, attaUuid, folderPath);
            existingCategory.setAttachment(attachmentRepo.save(new Attachment(attaUuid, prefix, fileName)));
            attachmentRepo.deleteById(categoryDTO.getAttachmentId());
        }
    }

    private CustomerCategory generateNewCustomerCategory(CustomerCategoryDTO categoryDTO, Attachment attachment) {
        return CustomerCategory.builder()
                .code(categoryDTO.getCode())
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .region(categoryDTO.getRegion())
                .active(categoryDTO.isActive())
                .attachment(attachment)
                .build();
    }


    @Override
    public HttpEntity<?> getCategories() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        return ResponseEntity.ok(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName("", active, Pageable.unpaged()).getContent());
    }

    @Override
    public HttpEntity<?> getCategoriesForTelegram() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        return ResponseEntity.ok(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName("", active, Pageable.unpaged()).getContent());
    }
}
