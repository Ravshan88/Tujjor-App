package com.example.backend.Services.JwtService;

import com.example.backend.Entity.User;

import java.security.Key;

public interface JwtService {
    String generateJWTToken(User users);

    String generateJWTRefreshToken(User users);
    String generateTelegramToken(User users);

    Key getSigningKey();

    String extractUserFromJwt(String token);

    boolean validateToken(String token);
}
