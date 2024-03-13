package com.example.backend.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ApiResponse {
    private boolean error;
    private String message;
    private Object data;
}
