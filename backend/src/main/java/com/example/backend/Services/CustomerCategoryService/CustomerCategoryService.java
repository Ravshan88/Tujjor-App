package com.example.backend.Services.CustomerCategoryService;


import com.example.backend.DTO.CustomerCategoryDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CustomerCategoryService {

    HttpEntity<?> getArchives();

    void deleteItem(Integer id);

    HttpEntity<?> archiveCategory(Integer id, boolean archive);

    HttpEntity<?> addCategory(CustomerCategoryDTO categoryDTO, MultipartFile photo, String prefix) throws IOException;

    void updateCategory(Integer id, CustomerCategoryDTO categoryDTO, MultipartFile photo, String prefix) throws IOException;

    HttpEntity<?> getCategories();

    HttpEntity<?> getCategoriesForTelegram();
}
