package com.example.backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentDTO  {
    private String username;
    private String phone;
    private String password;
    private String ownDealer;
    private String selectedDealer;
}
