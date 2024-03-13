package com.example.backend.Services.OrderService;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.OrderProduct;
import com.example.backend.Entity.Orders;
import com.example.backend.Enums.OrderStatus;
import com.example.backend.Payload.Request.OrderRowReq;
import com.example.backend.Projection.OrdersProjection;
import com.example.backend.Repository.*;
import com.example.backend.Services.JwtService.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrdersRepository orderRepo;
    private final OrderProductRepository orderProductRepository;
    private final ClientRepository clientRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final ProductRepository productRepository;
    private final JwtService jwtService;

    @Override
    public HttpEntity<?> getOrders() {
        return ResponseEntity.ok(orderRepo.findAll());
    }


    @Override
    public HttpEntity<?> verify(UUID clientId, UUID agentId, List<OrderRowReq> order) {
        Client client = clientRepository.findById(clientId).get();
        String agentName = usersRepository.findById(agentId).get().getUsername();
        sendVerifyCode(client, agentName, order);
        return ResponseEntity.ok("checking");
    }

    @Override
    public HttpEntity<?> postOrder(UUID id, List<OrderRowReq> orderRowReqList) {
        Orders savedOrder = orderRepo.save(Orders.builder()
                .id(UUID.randomUUID())
                .client(clientRepository.findById(id).get())
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.CREATED.name())
                .build());
        for (OrderRowReq orderRowReq : orderRowReqList) {
            orderProductRepository.save(OrderProduct.builder()
                    .orders(savedOrder)
                    .product(productRepository.findById(orderRowReq.getProduct().getId()).get())
                    .id(UUID.randomUUID())
                    .count(orderRowReq.getCount())
                    .build());
        }
        return ResponseEntity.ok("saved");
    }

    @Override
    public HttpEntity<?> findByStatus(String status, String token) {
        String userId = jwtService.extractUserFromJwt(token);
        System.out.println(userId);
        Pageable pageRequest = Pageable.unpaged();
        Page<OrdersProjection> ordersPage = null;
        if (status != null && !status.isEmpty()) {
            ordersPage = orderRepo.findByStatus(status, pageRequest);
        }
        assert ordersPage != null;
        if (ordersPage.getContent().isEmpty()) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(ordersPage);
    }

    @Override
    public HttpEntity<?> changeOrderStatus(UUID id, OrderStatus status) {
        Optional<Orders> optionalOrder = orderRepo.findById(id);

        if (optionalOrder.isPresent()) {
            Orders orders = optionalOrder.get();
            orders.setStatus(status.toString());
            if (status.equals(OrderStatus.COMPLETED)) {
                orders.setDelivering(false);
            }
            orderRepo.save(orders);
            return ResponseEntity.ok("Order edited successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void sendVerifyCode(Client client, String agentName, List<OrderRowReq> order) {
        String botToken = "6594137342:AAEewp8iG0WLOlwzUCcjmXEh1ZSa5Wximuk";
        String apiUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String message = "Assalomu aleykum " + client.getName() + ". " + agentName + " ismli agent sizning nomingizdan buyurtma bermoqchi. Rozimisiz? \n\n";
        message += stringifyOrder(order);
        String keyboard = "{\"inline_keyboard\":[[{\"text\":\"Ha ✅\",\"callback_data\":\"yes=" + client.getId() + "\"}],[{\"text\":\"Yo'q ❌\",\"callback_data\":\"no=" + client.getId() + "\"}]]}";

        String requestBody = String.format("{\"chat_id\":\"%s\",\"text\":\"%s\",\"reply_markup\":%s}", "1025298453", message, keyboard);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(apiUrl, request, String.class);
    }

    private String stringifyOrder(List<OrderRowReq> order) {
        StringBuilder result = new StringBuilder();
        Integer count = 0;
        double sum = 0;
        for (OrderRowReq orderRow : order) {
            String row = orderRow.getProduct().getTitle() + "            x" +
                    orderRow.getCount() + "            " +
                    orderRow.getProduct().getPrice() + orderRow.getCount();
            result.append(row + "\n");
            count += orderRow.getCount();
            sum += orderRow.getCount() * orderRow.getProduct().getPrice();
        }
        String line = "\n\n_______________________\n";
        String footer = "Jami:                          " + count + "\n" +
                "Umumiy narx:           " + sum + "so'm";
        result.append(line);
        result.append(footer);
        return result.toString();
    }
}
