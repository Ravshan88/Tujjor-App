package com.example.backend.Services.ClientPlaneServise;

import com.example.backend.DTO.ClientPlanDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientPlaneServise {
    HttpEntity<?> getPlansById(UUID clientId);

    HttpEntity<?> addNewPlane(ClientPlanDTO clientPlanDTO);

    HttpEntity<?> editePlane(ClientPlanDTO clientPlanDTO, UUID planeId);

    HttpEntity<?> getPlanForMap(UUID clientId);

    HttpEntity<?> getNotification();

    void goNextPlanAdd(Boolean confirm);
}