package com.example.backend.Repository;

import com.example.backend.Entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, UUID> {
}
