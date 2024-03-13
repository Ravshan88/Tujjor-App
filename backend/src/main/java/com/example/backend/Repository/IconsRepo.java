package com.example.backend.Repository;

import com.example.backend.Entity.Icons;
import com.example.backend.Projection.AttachmentProjection;
import com.example.backend.Projection.CurrierProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface IconsRepo extends JpaRepository<Icons, UUID> {


//    @Query(value = """
//                SELECT *
//                FROM icons i
//                WHERE
//                 lower(COALESCE(i.name, '')) LIKE lower(concat('%', :search, '%'))
//                 order by i.insertion_time desc
//            """, nativeQuery = true)
    Page<Icons> findAllByNameContainingIgnoreCaseOrderByInsertionTimeDesc(String search, Pageable pageable);


    @Query(value = """
            select i.attachment_id as id,i.name as name from icons i join attachments a on i.attachment_id = a.id
            """, nativeQuery = true)
    List<AttachmentProjection> findAllBYAttachmentId();
}