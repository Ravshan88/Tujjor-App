package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface DealerProjection {
    String getId();
    @Value("#{target.full_name}")
    String getFullName();
    String getAddress();
    String getCompany();
    @Value("#{target.own_agents}")
    Boolean getOwnAgents();
    @Value("#{target.partnership}")
    Boolean getPartnership();
    @Value("#{target.phone_number}")
    String getPhone();
    @Value("#{target.bot_active}")
    Boolean getBotActive();
    @Value("#{target.agents}")
    Object getAgents();
}
