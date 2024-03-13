package com.example.backend.Loaders;

import com.example.backend.Entity.*;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.time.LocalDateTime;
import java.util.*;

@Component
@RequiredArgsConstructor
public class DefaultDatesLoader implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final SettingsRepository settingsRepository;
    private final AttachmentRepository attachmentRepo;
    private final IconsRepo iconsRepo;
    private final DealerRepository dealerRepository;
    @Value("${files.path}")
    private String folderPathGlobal;


    @Override
    public void run(String... args) {
//        String roleSuperVisor = "ROLE_SUPER_VISOR";
        String superVisorName = "+998991250805";
        String companyName = "tujjor";
        if (
                roleRepository.findByRoleName(RoleEnum.ROLE_SUPER_VISOR.name()) == null
                        && usersRepository.findByPhone(superVisorName).isEmpty()
                        && companyRepository.findByCompanyName(companyName) == null
        ) {
            setUsersData(superVisorName);
        }

        if (settingsRepository.findAll().isEmpty()) {
            setSettings();
        }

        if (attachmentRepo.findAll().isEmpty() && iconsRepo.findAll().isEmpty()) {
            setDefaultIcons();
        }


        if (territoryRepository.findAll().isEmpty()) {
            setTerritory();
        }

        if (attachmentRepo.findAll().isEmpty() && iconsRepo.findAll().isEmpty()) {
            setDefaultIcons();
        }

        if (dealerRepository.findAll().isEmpty()) {
            setDealers();
        }
    }

    private void setDefaultIcons() {
        String prefix = "/defaultCategoryIcons";
        HashMap<UUID, String> hashMap = new HashMap<>();
        List<Attachment> attachmentsSaved = new ArrayList<>();
        List<String> iconsName = new ArrayList<>();
        String folderPath = folderPathGlobal + prefix;
        File folder = new File(folderPath);
        if (folder.exists() && folder.isDirectory()) {
            checkFiles(folder, hashMap, iconsName);
        } else {
            System.err.println("Cannot Find Directory");
            File file = new File(folderPathGlobal + "/defaultCategoryIcons");
            file.mkdirs();
            setDefaultIcons();
            return;
        }
        for (Map.Entry<UUID, String> entry : hashMap.entrySet()) {
            List<Attachment> attachments = getAttachments(entry, prefix);
            attachmentsSaved.addAll(attachmentRepo.saveAll(attachments));
        }
        for (Attachment attachment : attachmentsSaved) {
            int dotIndex = attachment.getName().lastIndexOf(".");
            int underscoreIndex = attachment.getName().indexOf("_");
            String name = attachment.getName().substring(underscoreIndex + 1, dotIndex);
            iconsRepo.save(new Icons(UUID.randomUUID(), attachment, name, LocalDateTime.now()));
        }
        if (customerCategoryRepository.findAll().isEmpty()) {
            setCustomerCategory();
        }
    }

    private static List<Attachment> getAttachments(Map.Entry<UUID, String> entry, String prefix) {
        UUID key = entry.getKey();
        String value = entry.getValue();
        return List.of(
                new Attachment(key, prefix, value)
        );
    }

    private static void checkFiles(File folder, HashMap<UUID, String> hashMap, List<String> iconsName) {
        File[] files = folder.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    String fileName = file.getName();
                    int underscoreIndex = fileName.indexOf("_");
                    if (underscoreIndex != -1) {
                        String uuid = fileName.substring(0, underscoreIndex);
                        hashMap.put(UUID.fromString(uuid), fileName);
                    } else {
                        System.out.println("Underscore not found in the string.");
                    }
                }
            }
        }
    }

    private void setCustomerCategory() {
        Attachment attachment = attachmentRepo.findAll().get(0);
        List<CustomerCategory> categories = new ArrayList<>();

        categories.add(new CustomerCategory(null, "Bukhara", "39184", "Market", "Super Market", true, attachment, null,false));
        categories.add(new CustomerCategory(null, "Tashkent", "28391", "Tech Market", "Tech Market", true, attachment, null,false));
        categories.add(new CustomerCategory(null, "Farg'ona", "92819", "Restaurant", "Restaurant", true, attachment, null,false));
        categories.add(new CustomerCategory(null, "Qo'qon", "74810", "Kanstavari", "Kanstavari", false, attachment, null,false));
        categories.add(new CustomerCategory(null, "Namangan", "8193", "ITPark", "ITPark", true, attachment, null,false));


        customerCategoryRepository.saveAll(categories);
    }

    private void setTerritory() {
        List<Territory> territories = new ArrayList<>();

        territories.add(new Territory(null, "Bukhara", "Buxoro", "MA0DP", true, 64.39096772460934, 39.737524678460645, LocalDateTime.now(),false));
        territories.add(new Territory(null, "Tashkent", "Toshkent", "DLA01", false, 69.29798027332778, 41.29861152419623, LocalDateTime.now(),false));
        territories.add(new Territory(null, "Farg'ona", "Farg'ona", "SODK05", true, 71.74943286619715, 40.350720394603776, LocalDateTime.now(),false));
        territories.add(new Territory(null, "Qo'qon", "Qo'qon", "AD01A", true, 70.94743091307214, 40.52700099193099, LocalDateTime.now(),false));
        territories.add(new Territory(null, "Namangan", "Namangan", "MLDM8", true, 71.66154224119714, 40.99480317106396, LocalDateTime.now(),false));

        territoryRepository.saveAll(territories);
    }

    private void setSettings() {
        List<Settings> settings = new ArrayList<>();
        settings.add(new Settings(null, "Company Profile", "/company-profile"));
        settings.add(new Settings(null, "Customer Category", "/customer-category"));
        settings.add(new Settings(null, "Territory", "/territory"));
        settings.add(new Settings(null, "Currier", "/currier"));
        settings.add(new Settings(null, "Icons", "/icons"));
        settings.add(new Settings(null, "Product Category", "/product-categories"));
        settings.add(new Settings(null, "Dealers", "/dealers"));
        settings.add(new Settings(null, "Product", "/product"));
        settingsRepository.saveAll(settings);
    }

    private void setUsersData(String superVisorName) {
        Role savedRole = roleRepository.save(
                Role.builder()
                        .roleName(RoleEnum.ROLE_SUPER_VISOR.name())
                        .build()
        );
        roleRepository.saveAll(List.of(
                Role.builder()
                        .roleName(RoleEnum.ROLE_AGENT.name())
                        .build(),
                Role.builder()
                        .roleName(RoleEnum.ROLE_CURRIER.name())
                        .build(),
                Role.builder()
                        .roleName(RoleEnum.ROLE_DEALER.name())
                        .build(),
                Role.builder()
                        .roleName(RoleEnum.ROLE_CLIENT.name())
                        .build()
        ));
        List<Role> roles = new ArrayList<>();
        roles.add(savedRole);
        User superVisor = usersRepository.save(
                new User(
                        null,
                        "Timur",
                        superVisorName,
                        passwordEncoder.encode("root123"),
                        roles
                )
        );
        companyRepository.save(
                Company.builder()
                        .companyName("Tujjor")
                        .region("Buxara")
                        .superVisor(superVisor)
                        .supportPhone("+998991250805")
                        .email("email@gmail.com")
                        .address("ShiftAcademy")
                        .build()
        );
    }


    private void setDealers() {

    }


}
