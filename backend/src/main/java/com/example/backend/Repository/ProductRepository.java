package com.example.backend.Repository;

import com.example.backend.Entity.Product;
import com.example.backend.Projection.CurrierProjection;
import com.example.backend.Projection.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    //    @Query(value = """
//                SELECT p.id as id,
//                p.count as count,
//                p.free as free,
//                p.price as price,
//                p.insertionTime as insertionTime,
//                p.attachment as attachment,
//                p.category as category,
//                p.title as title,
//                p.dealer as dealer
//                FROM Product p
//                WHERE
//                 lower(COALESCE(p.title, '')) LIKE lower(concat('%', :search, '%'))
//                ORDER BY p.insertionTime DESC
//            """)
    Page<ProductProjection> findAllByTitleContainingIgnoreCaseOrderByInsertionTimeDesc(String search, Pageable pageable);

    @Query("""
             SELECT p.id as id, p.count as count,
              p.free as free,p.price as price,
              p.insertionTime as insertionTime,p.attachment as attachment,
              p.category as category,p.title as title,
              p.dealer as dealer
               from Product p
               where p.id=:id
            """)
    ProductProjection findByProductId(UUID id);
}