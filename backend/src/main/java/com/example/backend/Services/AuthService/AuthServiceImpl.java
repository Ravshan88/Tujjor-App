package com.example.backend.Services.AuthService;

import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Payload.Request.LoginReq;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsersRepository userRepository;
    private final RoleRepository roleRepo;
    private final JwtServiceImpl jwtService;
    private final AuthenticationManager authenticationManager;



    @Override
    public HttpEntity<?> login(LoginReq dto) {
        String phone = validatePhoneNumber(dto);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, dto.getPassword()));
        return generateTokenForUser(dto, phone);
    }

    private static String validatePhoneNumber(LoginReq dto) {
        return dto.getPhone().startsWith("+")? dto.getPhone(): "+" + dto.getPhone();
    }

    private ResponseEntity<Map<String, Object>> generateTokenForUser(LoginReq dto, String phone) {
        User users = userRepository.findByPhone(phone).orElseThrow(() -> new NoSuchElementException("User not found for phone number: " + phone));
        List<Role> roles = roleRepo.findAll();
        String access_token = jwtService.generateJWTToken(users);
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", access_token);
        map.put("refresh_token", "");
        if (dto.getRememberMe()) {
            String refresh_token = jwtService.generateJWTRefreshToken(users);
            map.put("refresh_token", refresh_token);
        }
        map.put("roles", roles);
        return ResponseEntity.ok(map);
    }

    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractUserFromJwt(refreshToken);
        User user = userRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJWTToken(user);
        return ResponseEntity.ok(access_token);
    }
}