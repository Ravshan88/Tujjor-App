package com.example.backend.Services.DealerService;

import com.example.backend.DTO.DealerDTO;
import com.example.backend.Entity.Dealer;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface DealerService {
    List<Dealer> getDealers();
    Dealer addDealer(DealerDTO dealerData);
    Dealer updateDealer(UUID dealerId, DealerDTO dealerData);
    String deleteDealer(UUID dealerId);
}
