package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Services.ClientService.ClientService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.example.backend.Services.UsersService.CurrentUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;
    private final UniversalServiceFilter universalService;
    private final RoleRepository roleRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> saveClient(@Valid @RequestBody ClientDTO clientDTO){
        return clientService.saveClient(clientDTO);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> getClient(){
        return clientService.getClient();
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> updateClient(@RequestParam(defaultValue = "") UUID clientId, @RequestBody ClientDTO clientDTO){
        return clientService.updateClient(clientId,clientDTO);
    }

    @GetMapping("/pagination")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> pagination(@RequestParam Integer page,@RequestParam String limit, HttpServletRequest request) throws JsonProcessingException {
        return universalService.pagination(page,limit,request,"clients");
    }


    @GetMapping("/map")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> getClientsForMap(HttpServletRequest request) {
      return clientService.getClientsForMap(request);
    };

    @GetMapping("/courier/{clientId}")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT')")
    public HttpEntity<?> getClientCouriers(@PathVariable String clientId) {
        return clientService.getClientCouriers(UUID.fromString(clientId));
    };

    @GetMapping("/getClient/{id}")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_VISOR','ROLE_AGENT', 'ROLE_CLIENT')")
    public HttpEntity<?> getClientById(@PathVariable UUID id, @CurrentUser User user) {
        if (user.getAuthorities().contains(roleRepository.findByRoleName(RoleEnum.ROLE_CLIENT.name()))) return ResponseEntity.ok("Access Denied");
        return clientService.getClientById(id);
    }
}
