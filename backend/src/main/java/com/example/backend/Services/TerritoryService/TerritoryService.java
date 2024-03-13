package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import org.springframework.http.HttpEntity;

import java.util.UUID;



public interface TerritoryService {
    Territory addTerritory(TerritoryDTO territory);

    Territory updateTerritory(UUID id, TerritoryDTO territory);

    HttpEntity<?> getTerritories();

    HttpEntity<?> getTerritoryRegion();

    HttpEntity<?> getTerritoryForTelegram();

    HttpEntity<?> archiveTerritory(UUID id);

    HttpEntity<?> getArchives();

    void deleteItem(UUID id);
}