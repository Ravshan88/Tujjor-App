package com.example.backend.Services.AgentsService;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.Entity.Agent;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.UUID;

public interface AgentsService {

    HttpEntity<?> postAgent(AgentDTO agentDto);

    HttpEntity<?> putAgent(UUID id, AgentDTO agentDto);

    void deleteAgent(UUID id);

    HttpEntity<?> getAgents();

    HttpEntity<?> getDealerAgents(UUID uuid);
}
