package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface    OrdersProjection {
    UUID getId();

    String getStatus();

    String getPhoneNumber();

    String getClientName();

    LocalDateTime getCreatedAt();

    double getLongitude();

    double getLatitude();

    String getDescription();

    boolean getDelivering();

    @Value("#{@orderProductRepository.findByOrderIdAndCourierId(target.id,target.courierId)}")
    List<OrderedProductProjection> getProducts();

}
