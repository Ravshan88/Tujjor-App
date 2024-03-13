package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.Currier;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.*;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final UniversalServiceFilter universalServiceFilter;
    private final TerritoryRepository territoryRepository;
    private final CurrierRepository currierRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public HttpEntity<?> saveClient(ClientDTO clientDTO) {
        User user = generateUserForClient(clientDTO);
        Client client = generateClient(null, clientDTO);
        Client save = clientRepository.save(client);
        return ResponseEntity.ok("");
    }

    @Override
    public HttpEntity<?> getClient() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        return ResponseEntity.ok(clientRepository.getAllFilteredFields(new ArrayList<>(), new ArrayList<>(), active, "", "", "All", Pageable.unpaged()).getContent());
    }


    @Override
    public ResponseEntity<?> updateClient(UUID clientId, ClientDTO clientDTO) {
        Client generatedClient = generateClient(clientId, clientDTO);
        clientRepository.save(generatedClient);
        return ResponseEntity.ok("Client updated successfully");
    }


    @Override
    public HttpEntity<?> getClientsForMap(HttpServletRequest request) {
        JsonNode jsonNode = universalServiceFilter.wrapToObject(request);
        JsonNode cities = jsonNode.get("cities");
        List<String> citiesArr = new ArrayList<>();
        for (JsonNode city : cities) {
            citiesArr.add(city.asText());
        }
        return ResponseEntity.ok(clientRepository.getClientsForMap(citiesArr, jsonNode.get("search").asText(), jsonNode.get("allCity").asBoolean()));
    }

    @Override
    public HttpEntity<?> getClientCouriers(UUID uuid) {
        return ResponseEntity.ok(clientRepository.getClientCouriers(uuid));
    }

    @Override
    public HttpEntity<?> getClientById(UUID id) {
        return ResponseEntity.ok(clientRepository.findById(id).get());
    }

    private Client generateClient(UUID id, ClientDTO clientDTO) {


        List<Currier> allById = currierRepository.findAllById(Arrays.stream(clientDTO.getCouriersId().split(",")).map(UUID::fromString).collect(Collectors.toList()));
        return Client.builder()
                .id(id)
                .active(clientDTO.getActive())
                .botActive(id != null && clientRepository.findById(id).get().getBotActive())
                .user(usersRepository.findByPhone(clientDTO.getPhone()).get()) // warning
                .category(categoryRepository.findById(clientDTO.getCategoryId()).orElseThrow())
                .tin(clientDTO.getTin())
                .companyName(clientDTO.getCompanyName())
                .address(clientDTO.getAddress())
                .territory(territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow())
                .courier(allById)
                .name(clientDTO.getName())
                .longitude(clientDTO.getLongitude())
                .latitude(clientDTO.getLatitude())
                .insertionTime(LocalDateTime.now())
                .build();
    }

    private User generateUserForClient(ClientDTO clientDTO) {
        User user = usersRepository.save(User.builder()
                        .password(clientDTO.getPassword())
                        .phone(clientDTO.getPhone())
                        .roles(List.of(roleRepository.findByRoleName(RoleEnum.ROLE_CLIENT.name())))
                        .id(UUID.randomUUID())
                        .username(clientDTO.getName())
                .build());
        return user;
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
