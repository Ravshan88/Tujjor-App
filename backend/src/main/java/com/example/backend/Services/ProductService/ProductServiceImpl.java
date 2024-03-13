package com.example.backend.Services.ProductService;

import com.example.backend.DTO.ProductDTO;
import com.example.backend.Entity.Attachment;
import com.example.backend.Entity.Product;
import com.example.backend.Projection.ProductProjection;
import com.example.backend.Repository.AttachmentRepository;
import com.example.backend.Repository.DealerRepository;
import com.example.backend.Repository.ProductCategoryRepository;
import com.example.backend.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static com.example.backend.Services.AttachmentService.AttachmentServiceImpl.createFile;
import static com.example.backend.Services.AttachmentService.AttachmentServiceImpl.deleteFileFromFolder;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final AttachmentRepository attachmentRepo;
    @Value("${files.path}")
    private String folderPath;
    private final DealerRepository dealerRepository;

    @Override
    public HttpEntity<?> getProduct(UUID id) {
        return ResponseEntity.ok(productRepository.findById(id));
    }

    @Override
    public HttpEntity<?> getProducts() {
        Page<ProductProjection> filteredData = productRepository.findAllByTitleContainingIgnoreCaseOrderByInsertionTimeDesc("", Pageable.unpaged());
        return ResponseEntity.ok(filteredData.getContent());
    }

    @SneakyThrows
    @Override
    @Transactional
    public HttpEntity<?> postProduct(ProductDTO productDTO, String prefix, MultipartFile photo) {
        saveProduct(productDTO, prefix, photo);
        return ResponseEntity.ok("Product successfully saved");
    }

    private void saveProduct(ProductDTO productDTO, String prefix, MultipartFile photo) throws IOException {
        UUID id = UUID.randomUUID();
        String fileName = createFile(photo, prefix, id, folderPath);
        Attachment savedAttachment = attachmentRepo.save(new Attachment(id, prefix, fileName));
        Product newProduct = Product.builder()
                .title(productDTO.getTitle())
                .price(productDTO.getPrice())
                .count(productDTO.getCount())
                .free(productDTO.getFree())
                .dealer(productDTO.getDealerId() != null ? dealerRepository.findById(productDTO.getDealerId()).orElseThrow() : null)
                .category(productCategoryRepository.findById(productDTO.getCategoryId()).orElseThrow())
                .insertionTime(LocalDateTime.now())
                .attachment(savedAttachment)
                .build();
        productRepository.save(newProduct);
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editProduct(UUID id, ProductDTO productDTO, String prefix, MultipartFile photo) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setTitle(productDTO.getTitle());
            product.setPrice(productDTO.getPrice());
            product.setCount(productDTO.getCount());
            product.setFree(productDTO.getFree());
            product.setCategory(productCategoryRepository.findById(productDTO.getCategoryId()).orElseThrow());
            product.setDealer(productDTO.getDealerId() != null ? dealerRepository.findById(productDTO.getDealerId()).orElseThrow() : null);

            if (!productDTO.isDeletePhoto()) {
                product.setAttachment(attachmentRepo.findById(productDTO.getAttachmentId()).get());
            } else if (photo != null && !photo.isEmpty() && productDTO.isDeletePhoto()) {
                deleteFileFromFolder(prefix, productDTO.getAttachmentName(), folderPath);
                UUID photoId = UUID.randomUUID();
                String fileName = createFile(photo, prefix, photoId, folderPath);
                product.setAttachment(attachmentRepo.save(new Attachment(photoId, prefix, fileName)));
                attachmentRepo.deleteById(productDTO.getAttachmentId());
            }
            productRepository.save(product);
            return ResponseEntity.ok("Product successfully updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


