package com.example.backend.Repository;

import com.example.backend.Entity.TelegramUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TelegramUserRepository extends JpaRepository<TelegramUser, UUID> {
    TelegramUser findByChatId(Long chatId);
}
