package com.example.backend.Controller;


import com.example.backend.Entity.Orders;
import com.example.backend.Entity.User;
import com.example.backend.Enums.OrderStatus;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Payload.Request.OrderRowReq;
import com.example.backend.Repository.OrdersRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Services.OrderService.OrderService;
import com.example.backend.Services.UsersService.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final RoleRepository roleRepository;
    private final OrdersRepository ordersRepository;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT', 'ROLE_CLIENT')")
    public HttpEntity<?> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT', 'ROLE_CLIENT')")
    public HttpEntity<?> verifyClient(@RequestParam UUID id, @RequestBody List<OrderRowReq> order, @CurrentUser User user) {
        if (isaBoolean(id, user)) {
            return orderService.verify(id, user.getId(), order);
        }
        orderService.postOrder(id, order);
        return ResponseEntity.ok("saved by client");
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR', 'ROLE_CURRIER" +
            "')")
    public HttpEntity<?> getFilterCategory(@RequestParam(defaultValue = "NEW") String status,
                                           @RequestParam String token,
                                           @CurrentUser User user) {
        System.out.println(user);
        return orderService.findByStatus(status,token);
    }

    @PatchMapping("/{id}")
    public HttpEntity<?> changeOrderStatus(@PathVariable UUID id, @RequestParam OrderStatus status) {
        return orderService.changeOrderStatus(id, status);
    }

    @PatchMapping("delivering/{id}")
    public HttpEntity<?> changeOrderDeliveringStatus(@PathVariable UUID id) {
        Optional<Orders> byId = ordersRepository.findById(id);
        if (byId.isPresent()) {
            Orders orders = byId.get();
            orders.setDelivering(true);
            ordersRepository.save(orders);
        }
        return ResponseEntity.ok("Order edited successfully");
    }

    @PostMapping("/toOrder/{id}")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT', 'ROLE_CLIENT')")
    public HttpEntity<?> postOrder(@RequestBody List<OrderRowReq> orderRows, @PathVariable UUID id) {
        orderService.postOrder(id, orderRows);
        return ResponseEntity.ok("saved by agent");
    }

    private boolean isaBoolean(UUID id, User user) {
        return id != null && user.getRoles().contains(roleRepository.findByRoleName(RoleEnum.ROLE_AGENT.name())) || user.getRoles().contains(roleRepository.findByRoleName(RoleEnum.ROLE_SUPER_VISOR.name()));
    }
}
