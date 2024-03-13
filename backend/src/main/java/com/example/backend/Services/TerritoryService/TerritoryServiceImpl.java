package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Projection.TerritoryRegionProjection;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepository territoryRepository;
    private final UniversalServiceFilter universalServiceFilter;




    @Override
    public Territory addTerritory(TerritoryDTO territory) {
        return territoryRepository.save(generateNewTerritory(territory));
    }

    @Override
    public Territory updateTerritory(UUID id, TerritoryDTO territory) {
        Territory territoryData = generateUpdatedTerritory(territory, id);
        assert territoryData != null;
        territoryData.setId(id);
        return territoryRepository.save(territoryData);
    }

    private Territory generateUpdatedTerritory(TerritoryDTO territory, UUID id) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(territoryRepository.findById(id).get().getInsertionTime())
                .build();
    }


    private Territory generateNewTerritory(TerritoryDTO territory) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(LocalDateTime.now())
                .archive(false)
                .build();
    }


    @Override
    public HttpEntity<?> getTerritories() {
        List<Boolean> active= new ArrayList<>();
        active.add(true);
        active.add(false);
        Page<TerritoryProjection> filteredData = territoryRepository.getFilteredData("", active, Pageable.unpaged());
        return ResponseEntity.ok(filteredData.getContent());
    }




    @Override
    public HttpEntity<?> getTerritoryRegion() {
        List<TerritoryRegionProjection> allRegion = territoryRepository.findAllRegion();
        return ResponseEntity.ok(allRegion);
    }

    @Override
    public HttpEntity<?> getTerritoryForTelegram() {
        List<Boolean> active= new ArrayList<>();
        active.add(true);
        Page<TerritoryProjection> filteredData = territoryRepository.getFilteredData("", active, Pageable.unpaged());
        return ResponseEntity.ok(filteredData.getContent());
    }

    @Override
    public HttpEntity<?> archiveTerritory(UUID id) {
        Territory territory = territoryRepository.findById(id).get();
        territory.setArchive(true);
        Territory archived = territoryRepository.save(territory);
        return ResponseEntity.ok(archived);
    }

    @Override
    public HttpEntity<?> getArchives() {
        return ResponseEntity.ok(territoryRepository.findAllByArchive(true));
    }

    @Override
    public void deleteItem(UUID id) {
            territoryRepository.deleteById(id);
    }
}
