package com.example.backend.Repository;

import com.example.backend.Entity.Currier;
import com.example.backend.Projection.CurrierProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CurrierRepository extends JpaRepository<Currier, UUID> {
    @Query(value = """
                SELECT *
                FROM currier c
                WHERE (c.active IN :active OR :active IS NULL)
                    AND lower(COALESCE(c.firstname, '') || ' ' || COALESCE(c.lastname, '') || ''|| COALESCE(c.phone,'')) LIKE lower(concat('%', :search, '%'))
                ORDER BY c.insertion_time DESC
            """, nativeQuery = true)
    Page<CurrierProjection> getFilteredData(String search, List<Boolean> active, Pageable pageable);

    Currier findByPhone(String phone);

    Currier findByTelegramId(UUID id);

    Optional<Currier> findByUserId(UUID byId);
}

// c.id, c.firstname,c.lastname,c.phone,c.show_password as showPassword,c.longitude,c.latitude,
//                c.insertion_time as insertionTime, c.active, c.username,t.*

// JOIN currier_territory ct on c.id = ct.currier_id
//                 JOIN territory t ON ct.territory_id = t.id