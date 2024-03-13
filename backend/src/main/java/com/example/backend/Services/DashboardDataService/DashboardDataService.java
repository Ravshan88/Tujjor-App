package com.example.backend.Services.DashboardDataService;

import com.example.backend.DTO.DashboardDataDTO;
import com.example.backend.Entity.User;

public interface DashboardDataService {
    DashboardDataDTO getDashboardData(User user);
}
