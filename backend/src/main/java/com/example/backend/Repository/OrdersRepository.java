package com.example.backend.Repository;

import com.example.backend.Entity.Orders;
import com.example.backend.Projection.OrdersProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface OrdersRepository extends JpaRepository<Orders, UUID> {
    @Query(value = """

             SELECT
                o.id as id,
                o.status as status,
                o.phone_number as phoneNumber,
                o.client_name as clientName,
                o.created_at as createdAt,
                o.longitude as longitude, o.latitude as latitude,
                o.description as description,
                o.delivering as delivering,
                cc.courier_id as courierId
            FROM Orders o
            inner join client_courier cc on cc.client_id=o.client_id
            WHERE o.status = :status
            ORDER BY o.created_at DESC
             """, nativeQuery = true)
    Page<OrdersProjection> findByStatus(String status, Pageable pageRequest);

}
//    AND DATE(o.createdAt)=CURRENT DATE