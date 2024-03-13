package com.example.backend.Repository;

import com.example.backend.Entity.OrderProduct;
import com.example.backend.Projection.OrderedProductProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface OrderProductRepository extends JpaRepository<OrderProduct, UUID> {
    @Query(value = """            
             SELECT
                 op.id AS id,
                 op.product_id as productId,
                 op.count AS count
             FROM
                 order_product op
                 JOIN orders o ON op.orders_id = o.id
                 JOIN client_courier cc ON o.client_id = cc.client_id
             WHERE
                 o.id = :orders_id
                 AND cc.courier_id IN :courierId
            """, nativeQuery = true)
    List<OrderedProductProjection> findByOrderIdAndCourierId(UUID orders_id, List<UUID> courierId);
}
