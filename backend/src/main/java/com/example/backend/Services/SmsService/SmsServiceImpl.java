package com.example.backend.Services.SmsService;

import com.example.backend.DTO.SmsFiltersDTO;
import com.example.backend.DTO.SmsServiceDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Enums.BotUser;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.TelegramUserRepository;
import com.example.backend.TelegramBots.MerchantBot;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.send.SendPhoto;
import org.telegram.telegrambots.meta.api.methods.send.SendVideo;
import org.telegram.telegrambots.meta.api.objects.InputFile;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {
    private final TelegramUserRepository telegramUserRepository;
    private final MerchantBot merchantBot;
    private final ClientRepository clientRepository;


    @Override
    public void sendSms(SmsServiceDTO formDto, SmsFiltersDTO filtersDTO, MultipartFile file) {

            // Your existing logic to send text messages or handle other cases
            List<TelegramUser> all = telegramUserRepository.findAll();
            for (TelegramUser telegramUser : all) {
                Optional<Client> byPhone = clientRepository.findByUserPhone(telegramUser.getPhone());
                System.out.println(byPhone.isPresent());
                Client client = byPhone.get();
                if (filters(filtersDTO, telegramUser, client)) {
                    Map<String, String> keyValues = new HashMap<>();
                    keyValues.put("{name}", client.getName());

                    String correctedTitle = correctStringKeys(client, keyValues, formDto.getTitle());
                    String correctedDescription = correctStringKeys(client, keyValues, formDto.getDescription());

                    if (file != null && !file.isEmpty()) {
                        if (file.getContentType().startsWith("image/")) {
                            // Send photo
                            try {
                                sendPhoto(telegramUser.getChatId(), correctedTitle, correctedDescription, file);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        } else if (file.getContentType().startsWith("video/")) {
                            // Asynchronously process and send video
                            CompletableFuture.runAsync(() -> processAndSendVideo(telegramUser.getChatId(), correctedTitle, correctedDescription, file));
                        }
                    } else {
                        // Send text message
                        sendTextMessage(telegramUser.getChatId(), correctedTitle, correctedDescription);
                    }
                }
            }
    }


    private String correctStringKeys(Client client, Map<String, String> keyValues, String arg) {
        for (Map.Entry<String, String> entry : keyValues.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            arg = arg.replace(key, value);
        }

        // Now 'arg' contains the string with replaced keys
        return arg;
    }

    private static boolean filters(SmsFiltersDTO filtersDTO, TelegramUser telegramUser, Client client) {
        if (telegramUser.getBotUser().equals(BotUser.CLIENT) && filtersDTO.getCity().isEmpty() && filtersDTO.getCustomerCategories().isEmpty()) {
            return true;
        }
        return telegramUser.getBotUser().equals(BotUser.CLIENT) && filtersDTO.getCity().contains(client.getTerritory().getId().toString()) && filtersDTO.getCustomerCategories().contains(client.getCategory().getId());
    }


    private void sendTextMessage(Long chatId, String title, String description) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setText("<b>" + title + "</b>" + "\n" + description);
        sendMessage.enableHtml(true);
        sendMessage.setChatId(chatId);

        try {
            merchantBot.execute(sendMessage);
        } catch (TelegramApiException e) {
            System.err.println("chat topilmadi!");
        }
    }

    @SneakyThrows
    private void processAndSendVideo(Long chatId, String title, String description, MultipartFile file) {

        // Send the processed video
        sendVideo(chatId, title, description, file);
    }


    private void sendPhoto(Long chatId, String title, String description, MultipartFile photo) throws IOException {
        SendPhoto sendPhoto = new SendPhoto();
        sendPhoto.setPhoto(new InputFile(convertToInputStream(photo), "photo.jpg"));
        sendPhoto.setChatId(chatId);
        sendPhoto.enableNotification();
        sendPhoto.setCaption(title + "\n" + description);
        try {
            merchantBot.execute(sendPhoto);
        } catch (TelegramApiException e) {
            System.err.println("chat topilmadi!");
        }
    }


    private void sendVideo(Long chatId, String title, String description, MultipartFile video) throws IOException {
        SendVideo sendVideo = new SendVideo();
        sendVideo.setVideo(new InputFile(convertToInputStream(video), "video.mp4"));
        sendVideo.setChatId(chatId);
        sendVideo.setCaption(title + "\n" + description);
        try {
            merchantBot.execute(sendVideo);
        } catch (TelegramApiException e) {
            System.err.println("chat topilmadi!");
        }
    }

    private InputStream convertToInputStream(MultipartFile file) throws IOException {
        return file.getInputStream();
    }
}