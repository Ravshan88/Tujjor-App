package com.example.backend.Repository;

import com.example.backend.Entity.ClientPlan;
import com.example.backend.Projection.ClientPlaneProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ClientPlaneRepository extends JpaRepository<ClientPlan, UUID> {

    List<ClientPlaneProjection> findAllByClientIdOrderByCreatedDateDesc(UUID clientId);

    //    @Query(value = "select id, amount, 'date' from client_plan c where c.client_id = :clientId AND \n" +
//            "            EXTRACT('YEAR' FROM CAST(now() AS DATE)) = EXTRACT('YEAR' FROM c.date) \n" +
//            "            AND\n" +
//            "            EXTRACT('MONTH' FROM CAST(now() AS DATE)) = EXTRACT('MONTH' FROM c.date) ", nativeQuery = true)
//    List<ClientPlaneProjection> getPlaneForMap(UUID clientId);
    @Query(value = "select * from client_plan where client_id = :clientId order by created_date desc limit 1", nativeQuery = true)
    List<ClientPlaneProjection> getPlaneForMap(UUID clientId);

    @Query(value = """
 SELECT c2.id
 FROM client_plan cp
 INNER JOIN client c2 ON c2.id = cp.client_id
 WHERE cp.date =:plusMonthsDate
 AND NOT EXISTS (
     SELECT 1
     FROM client_plan cp2
     WHERE cp2.client_id = c2.id
     AND cp2.date =:currentDate
 )
        """, nativeQuery = true)
    List<UUID> getNotification(LocalDate currentDate, LocalDate plusMonthsDate);

    @Query(value = """
            SELECT COUNT(*) FROM client_plan cp 
            WHERE cp.client_id = :clientId 
            AND 
            EXTRACT(YEAR FROM CAST(:date AS DATE)) = EXTRACT(YEAR FROM cp.date) 
            AND
            EXTRACT(MONTH FROM CAST(:date AS DATE)) = EXTRACT(MONTH FROM cp.date)
            """, nativeQuery = true)
    Integer isMonthAvailable(@Param("clientId") UUID clientId, @Param("date") LocalDate date);

    @Query(value = """
                     SELECT cp.amount FROM client_plan cp 
                        WHERE cp.client_id = :clientId 
                        AND 
                        EXTRACT(YEAR FROM CAST(:date AS DATE)) = EXTRACT(YEAR FROM cp.date) 
                        AND
                        EXTRACT(MONTH FROM CAST(:date AS DATE)) = EXTRACT(MONTH FROM cp.date)
            """, nativeQuery = true)
    int getMonthOfClient(UUID clientId, LocalDateTime date);
}