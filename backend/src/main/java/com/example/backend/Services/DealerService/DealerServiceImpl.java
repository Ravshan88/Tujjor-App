package com.example.backend.Services.DealerService;

import com.example.backend.DTO.DealerDTO;
import com.example.backend.Entity.Dealer;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.AgentRepository;
import com.example.backend.Repository.DealerRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class   DealerServiceImpl implements DealerService {
    private final DealerRepository dealerRepository;
    private final AgentRepository agentRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Dealer> getDealers() {
        return dealerRepository.findAll();
    }

    @Override
    public Dealer addDealer(DealerDTO dealerData) {
        Dealer save = dealerRepository.save(generateDealerFromData(dealerData));
        return save;
    }

    @Override
    public Dealer updateDealer(UUID dealerId, DealerDTO dealerData) {
        return findAndEditDealer(dealerId, dealerData);
    }

    @Override
    public String deleteDealer(UUID dealerId) {
        dealerRepository.deleteById(dealerId);
        return "delete dealer";
    }

    private Dealer generateDealerFromData(DealerDTO dealerData) {
        List<UUID> agentIds = getUUIDes(dealerData.getAgentsId());
        User savedUser = usersRepository.save(generateUserFromData(dealerData));
        Optional<User> byPhone = usersRepository.findByPhone("+"+dealerData.getPhoneNumber());
        return Dealer
                .builder()
                .fullName(dealerData.getFullName())
                .user(byPhone.get())
                .address(dealerData.getAddress())
                .company(dealerData.getCompany())
                .agents(dealerData.getOwnAgents()?null:agentRepository.findAllById(agentIds))
                .ownAgents(dealerData.getOwnAgents())
                .partnership(dealerData.getPartnership())
                .insertionTime(LocalDateTime.now())
                .user(savedUser)
                .botActive(false)
                .build();
    }

    private Dealer findAndEditDealer(UUID dealerId, DealerDTO dealerData) {
        List<UUID> agentIds = getUUIDes(dealerData.getAgentsId());
        Dealer dealer = dealerRepository.findById(dealerId).orElseThrow();
        User user = dealer.getUser();
        user.setPassword(dealerData.getPhoneNumber());
        User savedUser = usersRepository.save(user);
        dealer.setId(dealerId);
        dealer.setFullName(dealerData.getFullName());
        dealer.setUser(usersRepository.findByPhone(dealerData.getPhoneNumber()).get());
        dealer.setAddress(dealerData.getAddress());
        dealer.setCompany(dealerData.getCompany());
        dealer.setAgents(agentRepository.findAllById(agentIds));
        dealer.setOwnAgents(dealerData.getOwnAgents());
        dealer.setPartnership(dealerData.getPartnership());
        dealer.setUser(savedUser);
        return dealerRepository.save(dealer);
    }

    private User generateUserFromData(DealerDTO dealerData) {
        List<Role> roles = List.of(
                roleRepository.findByRoleName(RoleEnum.ROLE_AGENT.name())
        );
        User user = User.builder()
                .phone(checkPhone(dealerData))
                .password(passwordEncoder.encode(dealerData.getPassword()))
                .roles(roles)
                .username(dealerData.getFullName())
                .build();
        return user;
    }

    private static String checkPhone(DealerDTO dealerData) {
        return dealerData.getPhoneNumber().startsWith("+") ? dealerData.getPhoneNumber() : "+" + dealerData.getPhoneNumber();
    }

    private static List<UUID> getUUIDes(String word) {
        List<UUID> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(UUID.fromString(s));
            }
        }
        return getIdes;
    }
}
