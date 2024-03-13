package com.example.backend.Services.ClientPlaneServise;

import com.example.backend.DTO.ClientPlanDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.ClientPlan;
import com.example.backend.Projection.ClientPlaneProjection;
import com.example.backend.Repository.ClientPlaneRepository;
import com.example.backend.Repository.ClientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientPlaneServiseImpl implements ClientPlaneServise{
    private final ClientPlaneRepository clientPlaneRepository;
    private final ClientRepository clientRepository;

    @Override
    public HttpEntity<?> getPlansById(UUID clientId) {
        List<ClientPlaneProjection> allClientPlaneByID = clientPlaneRepository.findAllByClientIdOrderByCreatedDateDesc(clientId);
        return ResponseEntity.ok(allClientPlaneByID);
    }

    @Override
    public HttpEntity<?> addNewPlane(ClientPlanDTO clientPlanDTO) {
        Client client = clientRepository.findById(clientPlanDTO.getClientId()).get();
        LocalDate date = clientPlanDTO.getDate();
        ClientPlan newClientPlan = new ClientPlan(
                UUID.randomUUID(),
                client,
                clientPlanDTO.getAmount(),
                clientPlanDTO.getDate().plusDays(1),
                date.atTime(LocalTime.MIDNIGHT)
        );
        Integer monthAvailable = clientPlaneRepository.isMonthAvailable(clientPlanDTO.getClientId(), newClientPlan.getDate());
        if(monthAvailable>0) {
         return ResponseEntity.ok("DATE_IS_NOT_AVAILABLE");
        }
        clientPlaneRepository.save(newClientPlan);
        return ResponseEntity.ok("Plan added successfully");
    }

    @Override
    public HttpEntity<?> editePlane(ClientPlanDTO clientPlanDTO, UUID planeId) {
        Client client = clientRepository.findById(clientPlanDTO.getClientId()).get();
        ClientPlan byId = clientPlaneRepository.findById(planeId).get();
        ClientPlan clientPlan = new ClientPlan(
                planeId,
                client,
                clientPlanDTO.getAmount(),
                clientPlanDTO.getDate().plusDays(1),
                byId.getCreatedDate()
        );
        Integer monthAvailable = clientPlaneRepository.isMonthAvailable(clientPlanDTO.getClientId(), clientPlan.getDate());
        if(monthAvailable>=1) {
            return ResponseEntity.ok("DATE_IS_NOT_AVAILABLE");
        }
        return ResponseEntity.ok(clientPlaneRepository.save(clientPlan));
    }

    @Override
    public HttpEntity<?> getPlanForMap(UUID clientId) {
        List<ClientPlaneProjection> planeForMap = clientPlaneRepository.getPlaneForMap(clientId);
        return ResponseEntity.ok(planeForMap);
    }

    @Override
    public HttpEntity<?> getNotification() {
        LocalDate currentDate = LocalDate.now();
        List<UUID> notification = clientPlaneRepository.getNotification(currentDate, currentDate.minusMonths(1));
        System.out.println(notification);
        return ResponseEntity.ok(notification.size());
    }

    @Override
    @Transactional
    public void goNextPlanAdd(Boolean confirm) {
        if (confirm){
            LocalDate currentDate = LocalDate.now();
            LocalDate plusMonthsDate = currentDate.minusMonths(1);
            List<UUID> notification = clientPlaneRepository.getNotification(currentDate, plusMonthsDate);
            for (int i = 0; i < notification.size(); i++) {
                Client byIdClient = clientRepository.findById(notification.get(i)).get();
                int amount = clientPlaneRepository.getMonthOfClient(byIdClient.getId(), LocalDateTime.now().minusMonths(1));
                ClientPlan newClientPlan = new ClientPlan(
                        UUID.randomUUID(),
                        byIdClient,
                        amount,
                        LocalDate.now(),
                        LocalDateTime.now()
                );
                clientPlaneRepository.save(newClientPlan);
            }
        }
    }
}