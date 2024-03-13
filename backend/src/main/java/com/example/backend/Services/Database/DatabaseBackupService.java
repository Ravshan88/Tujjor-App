package com.example.backend.Services.Database;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class DatabaseBackupService {

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    public void performDatabaseBackup(String backupFilePath) throws Exception {
        String pgDumpCommand = String.format(
                "../../usr/bin/pg_dump --host=localhost --port=5432 --username=postgres --format=custom --file=%s tujjor_db",
                backupFilePath);


        // Execute the command
        ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", pgDumpCommand);
        processBuilder.environment().put("PGPASSWORD", password); // Set the password in the environment

        // Redirect error stream to output stream
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        // Wait for the process to complete
        int exitCode = process.waitFor();

        // Check the exit code
        if (exitCode == 0) {
            System.out.println("Database backup created successfully!");
        } else {
            throw new Exception("Error creating database backup. Exit code: " + exitCode);
        }
    }
}
