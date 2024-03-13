package com.example.backend.Projection;

import com.example.backend.Entity.Territory;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface CurrierProjection extends ExcelExportable {
    UUID getId();

    UUID getTelegram_Id();

    String getFirstname();

    String getLastname();

    String getPhone();

    LocalDateTime getInsertion_Time();

    @Value("#{@territoryRepository.getTerritoriesByCurrier(target.id)}")
    List<Territory> getTerritory();

    Boolean getActive();

    String getUsername();

    String getShow_Password();

    Double getLatitude();

    Double getLongitude();

}
