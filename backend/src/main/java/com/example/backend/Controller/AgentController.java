package com.example.backend.Controller;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.Services.AgentsService.AgentsService;
import com.example.backend.Services.Universal.UniversalServiceFilterImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.AlgorithmConstraints;
import java.util.UUID;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
public class AgentController {
    private final UniversalServiceFilterImpl universalServiceFilter;
    private final AgentsService agentsService;

    @GetMapping
    public HttpEntity<?> getAgents(HttpServletRequest request) {
        return universalServiceFilter.pagination(0, "All", request, "agents");
    }

    @GetMapping("/all")
    public HttpEntity<?> getAllAgents() {
        return ResponseEntity.ok(agentsService.getAgents());
    }

    @GetMapping("/{dealerId}")
    public HttpEntity<?> getDealerAgents(@PathVariable String dealerId) {
        return ResponseEntity.ok(agentsService.getDealerAgents(UUID.fromString(dealerId)));
    }

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(HttpServletRequest request, @RequestParam Integer page, @RequestParam String limit) {
        return universalServiceFilter.pagination(page, limit, request, "agents");
    }

    @PostMapping
    public HttpEntity<?> postAgent(@RequestBody AgentDTO agentDto) {
        return ResponseEntity.ok(agentsService.postAgent(agentDto));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> putAgent(@PathVariable UUID id, @RequestBody AgentDTO agentDto) {
        return ResponseEntity.ok(agentsService.putAgent(id, agentDto));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteAgent(@PathVariable UUID id) {
        agentsService.deleteAgent(id);
        return ResponseEntity.ok("success delete");
    }
}
