package com.example.backend;

import com.example.backend.Services.Database.DatabaseBackupService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PreDestroy;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class BackendApplication {
//    public static void main(String[] args) {
//    @Autowired
//    private DatabaseBackupService backupService;
//    public static void main(String[] args) throws IOException {
//        SpringApplication.run(BackendApplication.class, args);
//    }
//    @SneakyThrows
//    @PreDestroy
//    @Profile("prod")
//    public void onShutdown() {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
//        String backupFileName = dateFormat.format(new Date()) + "-backup.sql";
//
//        // Combine the directory and file name
//        String backupFilePath = "./files/backup/" + backupFileName;
//        backupService.performDatabaseBackup(backupFilePath);
//    }
//
//
//    @Bean
//    public TelegramBotsApi telegramBotsApi() throws TelegramApiException {
//        return new TelegramBotsApi(DefaultBotSession.class);
//    }
@Autowired
private DatabaseBackupService backupService;

    public static void main(String[] args) throws IOException {
        SpringApplication.run(BackendApplication.class, args);
    }

    @SneakyThrows
    @PreDestroy
    @Profile("prod")
    public void onShutdown() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
        String backupFileName = dateFormat.format(new Date()) + "-backup.sql";

        // Combine the directory and file name
        String backupFilePath = "./files/backup/" + backupFileName;
        backupService.performDatabaseBackup(backupFilePath);
    }

    @Bean
    public TelegramBotsApi telegramBotsApi() throws TelegramApiException {
        return new TelegramBotsApi(DefaultBotSession.class);
    }
}