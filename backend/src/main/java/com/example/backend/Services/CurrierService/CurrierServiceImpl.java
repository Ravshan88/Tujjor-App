package com.example.backend.Services.CurrierService;

import com.example.backend.DTO.CurrierDTO;
import com.example.backend.Entity.*;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Projection.CurrierProjection;
import com.example.backend.Repository.CurrierRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CurrierServiceImpl implements CurrierService {
    private final CurrierRepository currierRepository;
    private final TerritoryRepository territoryRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;

    @Override
    public HttpEntity<?> getCarriers() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        Page<CurrierProjection> filteredData = currierRepository.getFilteredData("", active, Pageable.unpaged());
        return ResponseEntity.ok(filteredData.getContent());
    }

    @Override
    @Transactional
    public HttpEntity<?> postCurrier(CurrierDTO currierDTO) {
        try {
            String phone = checkPhoneIsValid(currierDTO);
            User savedUser = saveNewUser(currierDTO, phone);
            Currier newCurrier = saveNewCurrier(currierDTO, phone, savedUser, territoriesForCurrier(currierDTO));
            currierRepository.save(newCurrier);
            return ResponseEntity.ok("saved");
        } catch (Exception e) {
            return ResponseEntity.ok("Territory is already taken");
        }
    }

    @Override
    public HttpEntity<?> editCurrier(UUID id, CurrierDTO currierDTO) {
        Currier existingCurrier = currierRepository.findById(id).orElseThrow();
        existingCurrier.setPhone(checkPhoneIsValid(currierDTO));
        updateUser(currierDTO, existingCurrier);
        updateCurrier(currierDTO, existingCurrier);
        return ResponseEntity.ok("The currier is edited");
    }


    private static String checkPhoneIsValid(CurrierDTO currierDTO) {
        String phone = currierDTO.getPhone();
        phone = phone.startsWith("+") ? phone : "+" + phone;
        return phone;
    }

    private static Currier saveNewCurrier(CurrierDTO currierDTO, String phone, User savedUser, List<Territory> territoryList) {
        return Currier.builder()
                .phone(phone)
                .showPassword(currierDTO.getPassword())
                .firstname(currierDTO.getFirstname())
                .lastname(currierDTO.getLastname())
                .user(savedUser)
                .username(currierDTO.getUsername())
                .insertionTime(LocalDateTime.now())
                .active(currierDTO.getActive())
                .longitude(currierDTO.getLongitude())
                .latitude(currierDTO.getLatitude())
                .territory(territoryList)
                .build();
    }

    private List<Territory> territoriesForCurrier(CurrierDTO currierDTO) {
        List<UUID> uuiDes = getUUIDes(currierDTO.getTerritoryIds());
        List<Territory> territoryList = new ArrayList<>();
        for (UUID territoryId : uuiDes) {
            territoryList.add(territoryRepository.findById(territoryId).orElseThrow());
        }
        return territoryList;
    }

    private User saveNewUser(CurrierDTO currierDTO, String phone) {
        List<Role> roles = List.of(
                roleRepository.findByRoleName(RoleEnum.ROLE_CURRIER.toString())
        );
        User user = User.builder()
                .phone(phone)
                .password(passwordEncoder.encode(currierDTO.getPassword()))
                .roles(roles)
                .username(currierDTO.getUsername())
                .build();
        return usersRepository.save(user);
    }

    public void changeStatus(UUID id) {
        Optional<Currier> icon = currierRepository.findById(id);
        if (icon.isPresent()) {
            Currier currier = icon.get();
            currier.setArchive(true);
            currierRepository.save(currier);
        }
    }

    private void updateUser(CurrierDTO currierDTO, Currier existingCurrier) {
        User existingCurrierUser = existingCurrier.getUser();
        existingCurrierUser.setPassword(passwordEncoder.encode(existingCurrierUser.getPassword()));
        existingCurrierUser.setUsername(existingCurrier.getUsername());
        existingCurrierUser.setPhone(existingCurrier.getPhone());
        usersRepository.save(existingCurrierUser);
    }

    private void updateCurrier(CurrierDTO currierDTO, Currier existingCurrier) {
        existingCurrier.setTerritory(territoriesForCurrier(currierDTO));
        existingCurrier.setActive(currierDTO.getActive());
        existingCurrier.setFirstname(currierDTO.getFirstname());
        existingCurrier.setLastname(currierDTO.getLastname());
        existingCurrier.setLongitude(currierDTO.getLongitude());
        existingCurrier.setLatitude(currierDTO.getLatitude());
        existingCurrier.setUsername(currierDTO.getUsername());
        existingCurrier.setShowPassword(currierDTO.getPassword());
        existingCurrier.getUser().setPassword(passwordEncoder.encode(currierDTO.getPassword()));
        currierRepository.save(existingCurrier);
    }


    private static List<UUID> getUUIDes(String word) {
        List<UUID> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(UUID.fromString(s));
            }
        }
        return getIdes;
    }
}
