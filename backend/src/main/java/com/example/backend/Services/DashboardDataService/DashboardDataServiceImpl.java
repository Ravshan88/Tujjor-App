package com.example.backend.Services.DashboardDataService;

import com.example.backend.DTO.DashboardDataDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.UsersService.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardDataServiceImpl implements DashboardDataService {
    private final UsersRepository usersRepository;
    private final UsersService usersService;

    @Override
    public DashboardDataDTO getDashboardData(User user) {
        return generateDashboardData(user);
    }

    private static DashboardDataDTO generateDashboardData(User user) {
        LocalDate currentDate = LocalDate.now();
        String currentDateData = currentDate.getMonth().name() + ", " + currentDate.getDayOfMonth()  + ".";
        return DashboardDataDTO
                .builder()
                .currentDate(currentDateData)
                .currentSuperVisorPhoneNumber(user.getPhone())
                .build();
    }
}
