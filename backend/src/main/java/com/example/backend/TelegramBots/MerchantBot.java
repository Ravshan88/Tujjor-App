package com.example.backend.TelegramBots;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.*;
import com.example.backend.Enums.BotState;
import com.example.backend.Enums.BotUser;
import com.example.backend.Payload.Respons.VerifyClientRes;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.*;
import com.example.backend.Services.JwtService.JwtService;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.ParseMode;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Contact;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboard;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppData;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
@ConditionalOnProperty(name = "bot.active", havingValue = "true", matchIfMissing = true)
public class MerchantBot extends TelegramLongPollingBot {
    private TelegramUser telegramUser;
    private final TelegramUserRepository telegramUserRepository;
    private final TerritoryRepository territoryRepository;
    private final JwtService jwtService;
    private final AgentRepository agentRepository;
    private final AuthenticationManager authenticationManager;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final ClientRepository clientRepository;
    private final DealerRepository dealerRepository;
    private final UsersRepository usersRepository;
    private final CurrierRepository currierRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;


    private String botToken = "6981411703:AAF8uMwBzE-LGSUGJITKE9p2Q3WXhI4k97o";


    private String webAppUrl = "https://9ef1-213-230-86-234.ngrok-free.app";

    @Override
    public String getBotToken() {
        return botToken;
    }


    @SneakyThrows
    @Autowired
    public MerchantBot(TelegramBotsApi api, TelegramUserRepository telegramUserRepository, TerritoryRepository territoryRepository, JwtService jwtService, AgentRepository agentRepository, AuthenticationManager authenticationManager, CustomerCategoryRepository customerCategoryRepository, CurrierRepository currierRepository, ClientRepository clientRepository, DealerRepository dealerRepository, final UsersRepository usersRepository) throws TelegramApiException {
        this.usersRepository = usersRepository;
        api.registerBot(this);
        this.telegramUserRepository = telegramUserRepository;
        this.territoryRepository = territoryRepository;
        this.jwtService = jwtService;
        this.agentRepository = agentRepository;
        this.authenticationManager = authenticationManager;
        this.customerCategoryRepository = customerCategoryRepository;
        this.clientRepository = clientRepository;
        this.dealerRepository = dealerRepository;
        this.currierRepository = currierRepository;
    }

    @Override
    public String getBotUsername() {
        return "@tujjor_test_bot";
    }


    private TelegramUser getUserByChatId(Long chatId) {
        TelegramUser byChatId = telegramUserRepository.findByChatId(chatId);
        return Objects.requireNonNullElseGet(byChatId, () -> telegramUserRepository.save(new TelegramUser(
                chatId,
                BotState.START
        )));
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage()) {
            Message message = update.getMessage();
            Long chatId = message.getChatId();
            telegramUser = getUserByChatId(chatId);
            if (message.hasText()) {
                String text = message.getText();
                if (text.equalsIgnoreCase("/start")) {
                    if (!checkAgent()) {
                        Message execute = execute(SendMessage.builder()
                                .chatId(chatId)
                                .text("Salom \uD83D\uDC4B\uD83C\uDFFB <b>" + message.getFrom().getFirstName() + "</b>")
                                .parseMode(ParseMode.HTML)
                                .replyMarkup(generateShareContactButton())
                                .build());
                        telegramUser.setMessageId(execute.getMessageId());
                        telegramUser.setState(BotState.SHARE_CONTACT);
                        telegramUserRepository.save(telegramUser);
                    } else {
                        agentLogin(chatId);
                    }
                } else if (telegramUser.getState().equals(BotState.ENTER_PASSWORD)) {
                    telegramUser.setPassword(text);
                    telegramUserRepository.save(telegramUser);

                    if (telegramUser.getRole().equals(RoleEnum.ROLE_CURRIER.toString())) {
                        Currier currier = currierRepository.findByPhone(telegramUser.getPhone());
                        if (currier == null) {
                            execute(SendMessage.builder()
                                    .chatId(chatId)
                                    .text("Siz kurerlar ro'yxatida mavjud emassiz ❌")
                                    .build());
                        } else {
                            try {
                                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(telegramUser.getPhone(), telegramUser.getPassword()));
                                currier.setTelegramId(telegramUser.getId());
                                currierRepository.save(currier);
                                botLoginForCurrier(chatId);
                            } catch (BadCredentialsException e) {
                                execute(SendMessage.builder()
                                        .chatId(chatId)
                                        .text("Iltimos parolni to'g'ri kiriting!")
                                        .build());
                            }
                        }
                    } else if (telegramUser.getRole().equals(RoleEnum.ROLE_AGENT.toString())) {
                        Agent agent = agentRepository.findByUserPhone(telegramUser.getPhone());
                        if (agent == null) {
                            execute(SendMessage.builder()
                                    .chatId(chatId)
                                    .text("Siz agentlar ro'yxatida mavjud emassiz ❌")
                                    .build());
                        } else {
                            try {
                                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(telegramUser.getPhone(), telegramUser.getPassword()));
                                agent.setTelegramId(telegramUser.getId());
                                agentRepository.save(agent);
                                agentLogin(chatId);
                            } catch (BadCredentialsException e) {
                                execute(SendMessage.builder()
                                        .chatId(chatId)
                                        .text("Iltimos parolni to'g'ri kiriting!")
                                        .build());
                            }
                        }
                    } else if (telegramUser.getRole().equals(RoleEnum.ROLE_DEALER.toString())) {
                        Dealer dealer = dealerRepository.findByUserPhone(telegramUser.getPhone());
                        if (dealer == null) {
                            execute(SendMessage.builder()
                                    .chatId(chatId)
                                    .text("Siz dillerlar ro'yxatida mavjud emassiz ❌")
                                    .build());
                        } else {
                            try {
                                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(telegramUser.getPhone(), telegramUser.getPassword()));
                                dealer.setTelegramId(telegramUser.getId());
                                dealerRepository.save(dealer);
                                dealerLogin(chatId);
                            } catch (BadCredentialsException e) {
                                execute(SendMessage.builder()
                                        .chatId(chatId)
                                        .text("Iltimos parolni to'g'ri kiriting!")
                                        .build());
                            }
                        }

                    }
                }
            } else if (message.hasContact() && telegramUser.getState().equals(BotState.SHARE_CONTACT)) {

//                Checking If Forwarded


                if (checkIfForwarded(message)) {
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("Please,Send Your Own Contact! (Failed ❌)");
                    sendMessage.setChatId(message.getChatId());
                    execute(sendMessage);
                    return;
                }

//                Other Block Of Code

                execute(DeleteMessage.builder()
                        .chatId(chatId)
                        .messageId(telegramUser.getMessageId())
                        .build());
                Contact contact = message.getContact();
                String number = contact.getPhoneNumber();
                number = number.startsWith("+") ? number : "+" + number;
                telegramUser.setPhone(number);
                if (ifUserIsClient(telegramUser) || ifUserIsDealer(telegramUser)) {
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("Hello Sir,you're recognised as client,Welcome!");
                    sendMessage.setChatId(chatId);
                    sendMessage.setReplyMarkup(generateClientMenu());
                    execute(sendMessage);
                    telegramUserRepository.save(telegramUser);
                    return;
                }

                telegramUser.setState(BotState.ENTER_PASSWORD);
                telegramUserRepository.save(telegramUser);
                Optional<User> userOptional = usersRepository.findByPhone(number);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    telegramUser.setPhone(number);
                    telegramUser.setRole(user.getRoles().get(0).getRoleName());
                    telegramUser.setState(BotState.ENTER_PASSWORD);
                    telegramUserRepository.save(telegramUser);
                }
                execute(SendMessage.builder()
                        .chatId(chatId)
                        .text("Iltimos super admindan parolni oling va botga yuboring ✅")
                        .build());
            } else {
                WebAppData webAppData = message.getWebAppData();
                String data = webAppData.getData();
                Gson gson = new Gson();
                ClientDTO clientDTO = gson.fromJson(data, ClientDTO.class);
                clientRepository.save(Client.
                        builder()
                        .territory(territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow())
                        .category(customerCategoryRepository.findById(clientDTO.getCategoryId()).orElseThrow())
                        .user(usersRepository.findByPhone("+" + clientDTO.getPhone()).get()) // there is warning
                        .name(clientDTO.getName())
                        .companyName(clientDTO.getCompanyName())
                        .address(clientDTO.getAddress())
                        .active(true)
                        .tin(clientDTO.getTin())
                        .referencePoint(clientDTO.getReferencePoint())
                        .insertionTime(LocalDateTime.now())
                        .longitude(clientDTO.getLongitude())
                        .latitude(clientDTO.getLatitude())
                        .build());
            }
        } else if (update.hasCallbackQuery()) {
            String[] data = update.getCallbackQuery().getData().split("=");
            String status = data[0];
            String clientId = data[1];
            simpMessagingTemplate.convertAndSend("/topics/verifyClient", new VerifyClientRes(status, UUID.fromString(clientId)));
        }
    }

    private boolean ifUserIsDealer(TelegramUser telegramUser) {
        Optional<Dealer> byPhone = dealerRepository.findByPhoneNumber(telegramUser.getPhone());
        if (byPhone.isPresent()) {
            if (!byPhone.get().getBotActive()) {
                byPhone.get().setBotActive(true);
                dealerRepository.save(byPhone.get());
            }
        }
        return byPhone.isPresent();
    }

    @SneakyThrows
    private boolean ifUserIsClient(TelegramUser telegramUser) {
        Optional<Client> byPhone = clientRepository.findByUserPhone(telegramUser.getPhone());
        if (byPhone.isPresent()) {
            if (!byPhone.get().getBotActive()) {
                byPhone.get().setBotActive(true);
                clientRepository.save(byPhone.get());
                byPhone.get().setTelegramId(telegramUser.getId());
                telegramUser.setBotUser(BotUser.CLIENT);
                telegramUserRepository.save(telegramUser);
            }
        }
        return byPhone.isPresent();
    }

    private boolean checkIfForwarded(Message message) {
        return !message.getFrom().getId().equals(message.getContact().getUserId());
    }

    private void agentLogin(Long chatId) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Siz muvaffaqiyatli ro'yxatdan o'tdingiz ✅</b>")
                .replyMarkup(generateAgentMenu())
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.SELECT_MENU);
        telegramUser.setBotUser(BotUser.AGENT);
    }

    private void dealerLogin(Long chatId) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Siz muvaffaqiyatli ro'yxatdan o'tdingiz, janob Diller ✅</b>")
                .replyMarkup(generateDealerMenu())
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.SELECT_MENU);
    }

    private void botLoginForCurrier(Long chatId) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Siz muvaffaqiyatli ro'yxatdan o'tdingiz ✅</b>")
                .replyMarkup(generateMainMenuForCurrier())
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.SELECT_MENU);
    }

    private ReplyKeyboard generateAgentMenu() {
        String token = jwtService.generateTelegramToken(agentRepository.findByTelegramId(telegramUser.getId()).getUser());
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardRow second = new KeyboardRow();
        KeyboardRow third = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setText("Yangi mijoz qo'shish");
        button.setWebApp(new WebAppInfo(webAppUrl + "/telegram/add-client/" + token));
        KeyboardButton catalog = new KeyboardButton();
        catalog.setText("Catalog");
        catalog.setWebApp(new WebAppInfo(webAppUrl + "/telegram/catalog/" + token));
        KeyboardButton clients = new KeyboardButton();
        clients.setText("Mijozlar");
        clients.setWebApp(new WebAppInfo(webAppUrl + "/telegram/clients/" + token));
        KeyboardButton clientsOnTheMap = new KeyboardButton();
        clientsOnTheMap.setText("Mijozlar xaritada");
        clientsOnTheMap.setWebApp(new WebAppInfo(webAppUrl + "/telegram/clients-on-the-map/" + token));
        third.add(clientsOnTheMap);
        second.add(clients);
        row.add(button);
        row.add(catalog);
        rows.add(row);
        rows.add(second);
        rows.add(third);
        keyboardMarkup.setKeyboard(rows);
        keyboardMarkup.setResizeKeyboard(true);
        return keyboardMarkup;
    }

    private ReplyKeyboard generateMainMenuForCurrier() {
        String token = jwtService.generateTelegramToken(currierRepository.findByTelegramId(telegramUser.getId()).getUser());
        System.out.println(token);
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setText("\uD83D\uDECD Buyurtmalar");
        button.setWebApp(new WebAppInfo(webAppUrl + "/telegram/orders/" + token));
        row.add(button);
        rows.add(row);
        keyboardMarkup.setKeyboard(rows);
        keyboardMarkup.setResizeKeyboard(true);
        return keyboardMarkup;
    }

    private ReplyKeyboard generateDealerMenu() {
        String token = jwtService.generateTelegramToken(dealerRepository.findByTelegramId(telegramUser.getId()).getUser());
        System.out.println(token);
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardRow second = new KeyboardRow();
        KeyboardRow third = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setText("Mahsulotlar");
        button.setWebApp(new WebAppInfo(webAppUrl + "/telegram/product/" + token));
        row.add(button);
        rows.add(row);
        rows.add(second);
        rows.add(third);
        keyboardMarkup.setKeyboard(rows);
        keyboardMarkup.setResizeKeyboard(true);
        return keyboardMarkup;
    }

    private ReplyKeyboard generateClientMenu() {
        Client client = clientRepository.findByUserPhone(telegramUser.getPhone()).get();
        String token = jwtService.generateTelegramToken(client.getUser());
        System.out.println(token);
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setText("Buyurtma berish");
        button.setWebApp(new WebAppInfo(webAppUrl + "/telegram/order/" + client.getId() + "?token=" + token));
        row.add(button);
        rows.add(row);
        keyboardMarkup.setKeyboard(rows);
        keyboardMarkup.setResizeKeyboard(true);
        return keyboardMarkup;
    }

    private Boolean checkAgent() {
        Agent agent = agentRepository.findByTelegramId(telegramUser.getId());
        return agent != null;
    }

    private ReplyKeyboard generateShareContactButton() {
        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
        replyKeyboardMarkup.setResizeKeyboard(true);
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setRequestContact(true);
        button.setText("Raqamni jo'natish \uD83D\uDCDE");
        row.add(button);
        rows.add(row);
        replyKeyboardMarkup.setKeyboard(rows);
        return replyKeyboardMarkup;
    }

}
