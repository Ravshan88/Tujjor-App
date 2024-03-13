package com.example.backend.Payload.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginReq {
    private String username;
    @NotBlank(message = "qani password")
    private String password;
    @NotBlank(message = "qani phone")
    private String phone;
    private Boolean rememberMe;
}
