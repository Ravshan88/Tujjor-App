package com.example.backend.Repository;

import com.example.backend.Entity.ProductCategory;
import com.example.backend.Projection.DealerProjection;
import com.example.backend.Projection.ProductCategoryProjection;
import org.apache.commons.lang3.text.translate.UnicodeUnescaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, UUID> {
    @Query(value = """
            select pc.id, pc.name from product_category pc
                where lower(COALESCE(pc.name, '')) LIKE lower(concat('%', :quickSearch, '%'))
                order by pc.insertion_time desc
                        """, nativeQuery = true)
    Page<ProductCategoryProjection> getFilteredData(String quickSearch, Pageable pageable);
}
