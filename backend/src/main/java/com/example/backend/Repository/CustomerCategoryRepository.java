package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CustomerCategoryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpEntity;

import java.util.List;

public interface CustomerCategoryRepository extends JpaRepository<CustomerCategory, Integer> {


    @Query(value = """
            SELECT *
            FROM
                customer_category c
            WHERE
                 (c.active IN :status OR :status IS NULL) 
            AND c.archive=false     
            AND LOWER(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) LIKE LOWER(concat('%', :search, '%'))
            ORDER BY c.insertion_time DESC
            """, nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, List<Boolean> status, Pageable pageable);


    List<CustomerCategory> findAllByArchive(Boolean archive);
}
