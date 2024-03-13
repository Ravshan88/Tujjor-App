package com.example.backend.Controller;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Services.TerritoryService.TerritoryService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/territory")
public class TerritoryController {
    private final TerritoryService territoryService;
    private final UniversalServiceFilter universalService;

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalService.pagination(page, limit, request, "territory");
    }

    @GetMapping
    public HttpEntity<?> getTerritories() {
        return territoryService.getTerritories();
    }


    @GetMapping("/region")
    public HttpEntity<?> getTerritoryRegion() {
        return territoryService.getTerritoryRegion();
    }

    @PostMapping()
    public HttpEntity<?> saveTerritory(@Valid @RequestBody TerritoryDTO territoryDTO) {
        return ResponseEntity.ok(territoryService.addTerritory(territoryDTO));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> updateTerritory(@PathVariable UUID id, @RequestBody TerritoryDTO territoryDTO) {
        return ResponseEntity.ok(territoryService.updateTerritory(id, territoryDTO));
    }
   @PutMapping("/archive/{id}")
   public HttpEntity<?> archiveTerritory(@PathVariable UUID id){
        return ResponseEntity.ok(territoryService.archiveTerritory(id));
   }
   @GetMapping("/getArchive")
   public HttpEntity<?> getArchives(){
        return territoryService.getArchives();
   }
   @DeleteMapping("/{id}")
   public void deleteItem(@PathVariable UUID id){
        territoryService.deleteItem(id);
   }
    @GetMapping("/telegram")
    public HttpEntity<?> getTerritoryForTelegram() {
        return territoryService.getTerritoryForTelegram();
    }

    ;
}
