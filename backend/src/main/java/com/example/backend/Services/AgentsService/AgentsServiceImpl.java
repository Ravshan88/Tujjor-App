package com.example.backend.Services.AgentsService;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.Entity.Agent;
import com.example.backend.Entity.Dealer;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Projection.DealerAgentsProjection;
import com.example.backend.Repository.AgentRepository;
import com.example.backend.Repository.DealerRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AgentsServiceImpl implements AgentsService {
    private final AgentRepository agentRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final DealerRepository dealerRepository;


    @Override
    public HttpEntity<?> postAgent(AgentDTO agentDto) {
        System.out.println(agentDto.getSelectedDealer() + " dealer");
        List<Role> roles = List.of(
                roleRepository.findByRoleName(RoleEnum.ROLE_AGENT.name())
        );
        String phone = agentDto.getPhone();
        phone = phone.startsWith("+") ? phone : "+" + phone;
        User user = User.builder()
                .phone(phone)
                .password(passwordEncoder.encode(agentDto.getPassword()))
                .roles(roles)
                .username(agentDto.getUsername())
                .build();
        User save = usersRepository.save(user);
        Agent newAgent = agentRepository.save(Agent.builder()
                .user(save)
                .username(agentDto.getUsername())
                .ownDealer(Boolean.parseBoolean(agentDto.getOwnDealer()))
                .build());
        if (agentDto.getSelectedDealer() != null) {
            Dealer dealer = dealerRepository.findById(UUID.fromString(agentDto.getSelectedDealer())).orElseThrow();
            List<Agent> newAgents;
            List<Agent> agents = dealer.getAgents();
            newAgents = agents;
            newAgents.add(newAgent);
            dealerRepository.save(dealer);
        }

        return ResponseEntity.ok("saved");
    }

    @Override
    public HttpEntity<?> putAgent(UUID id, AgentDTO agentDto) {
        Agent agent = agentRepository.findById(id).get();
        agent.setUsername(agentDto.getUsername());
        User user = usersRepository.findById(agent.getUser().getId()).get();
        user.setUsername(agentDto.getUsername());
        user.setPhone(agentDto.getPhone().startsWith("+") ? agentDto.getPhone() : "+" + agentDto.getPhone());
        if (agentDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(agentDto.getPassword()));
        }
        Dealer dealer = dealerRepository.findById(UUID.fromString(agentDto.getSelectedDealer())).orElseThrow();
        List<Agent> agents = dealer.getAgents();
        System.out.println(agents);
        agent.setUser(user);
        editOrDeleteDealerFromAgent(id, agentDto);
        Agent edited = agentRepository.save(agent);
        return ResponseEntity.ok(edited);
    }

    @Override
    public void deleteAgent(UUID id) {
        agentRepository.deleteById(id);
    }

    @Override
    public HttpEntity<?> getAgents() {
        return ResponseEntity.ok(agentRepository.findAll());
    }

    @Override
    public HttpEntity<?> getDealerAgents(UUID uuid) {
        return ResponseEntity.ok(agentRepository.getDealerAgents(uuid));
    }

    private void editOrDeleteDealerFromAgent(UUID id, AgentDTO agentDto) {
        if (agentDto.getSelectedDealer() == null) {
            agentRepository.deleteDealerFromAgent(id);
        } else {
            agentRepository.updateDealerForAgent(id, UUID.fromString(agentDto.getSelectedDealer()));
        }
    }
}