package com.example.backend.Services.UsersService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import org.springframework.http.HttpEntity;

public interface UsersService {
    HttpEntity<?> addUser(UserDTO dto);


    HttpEntity<?> getMe(User user);
}
