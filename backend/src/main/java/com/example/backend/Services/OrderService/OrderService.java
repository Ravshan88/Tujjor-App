package com.example.backend.Services.OrderService;

import com.example.backend.Enums.OrderStatus;
import com.example.backend.Payload.Request.OrderRowReq;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    HttpEntity<?> getOrders();

    HttpEntity<?> verify(UUID clientId, UUID agentId, List<OrderRowReq> order);

    HttpEntity<?> postOrder( UUID id, List<OrderRowReq> orderRowReqList);

    HttpEntity<?> findByStatus(String status, String token);
    HttpEntity<?> changeOrderStatus( UUID id,OrderStatus status);

}
