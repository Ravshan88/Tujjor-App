package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface AgentProjection extends ExcelExportable{
    @Value("#{target.agentid}")
    UUID getAgentId();
    @Value("#{target.userid}")
    UUID getUserId();
    String getUsername();
    String getPhone();
    Object getDealer();
}
