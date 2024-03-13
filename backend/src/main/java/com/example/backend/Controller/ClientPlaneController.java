package com.example.backend.Controller;

import com.example.backend.DTO.ClientPlanDTO;
import com.example.backend.Services.ClientPlaneServise.ClientPlaneServise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/plane")
@RequiredArgsConstructor
public class ClientPlaneController {
    private final ClientPlaneServise clientPlaneServise;
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    @GetMapping
    public HttpEntity<?> getPlane(@RequestParam(defaultValue = "") UUID clientId) {
        return clientPlaneServise.getPlansById(clientId);
    }
    @PostMapping
    public HttpEntity<?> addPlane(@RequestBody ClientPlanDTO clientPlanDTO) {
        return clientPlaneServise.addNewPlane(clientPlanDTO);
    }
    @PutMapping
    public HttpEntity<?> editePlane(@RequestBody ClientPlanDTO clientPlanDTO, @RequestParam UUID planeId) {
        return clientPlaneServise.editePlane(clientPlanDTO, planeId);
    }
    @GetMapping("/forMap")
    public HttpEntity<?> getPlaneForMap(@RequestParam UUID clientId) {
        return clientPlaneServise.getPlanForMap(clientId);
    }
    @GetMapping("/notificationPlane")
    public HttpEntity<?> getNotificationPlane() {
        return clientPlaneServise.getNotification();
    }
    @PostMapping("/goNextPlansAdd")
    public void goNextPlanAdd(@RequestParam Boolean confirm) {
        clientPlaneServise.goNextPlanAdd(confirm);
    }
}