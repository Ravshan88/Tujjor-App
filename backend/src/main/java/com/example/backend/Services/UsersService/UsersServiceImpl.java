package com.example.backend.Services.UsersService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

    private final UsersRepository repository;
    private final RoleRepository roleRepository;
    @Override
    public HttpEntity<?> addUser(UserDTO userData) {

        List<Role> roles = new ArrayList<>();

        roles.add(addUserRoleIfAbsent());

        User newUser = new User(
                null,
                userData.getUsername(),
                userData.getPhone(),
                userData.getPassword(),
                roles

        );
        User savedUser = repository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

//    @Override
//    public HttpEntity<?> getStudents(String role) {
//        return ResponseEntity.ok(repository.findAllByRoles(role));
//    }
//
//    @Override
//    public HttpEntity<?> getStudentByTitle(String title) {
//        return ResponseEntity.ok(repository.findAllByUsernameContainingIgnoreCase(title));
//    }

    public Role addUserRoleIfAbsent() {
        Role userRole = roleRepository.findByRoleName("ROLE_USER");
        if (userRole == null) {
            return roleRepository.save(new Role(
                    null,
                    "ROLE_USER",
                    null,
                    null
            ));
        }

        return roleRepository.findByRoleName("ROLE_USER");
    }

    @Override
    public HttpEntity<?> getMe(User user) {
        return ResponseEntity.ok(user);
    }
}