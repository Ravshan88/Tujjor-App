package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface CustomerCategoryProjection extends ExcelExportable {

    Integer getId();

    String getCode();

    String getName();

    String getDescription();

    String getRegion();

    Boolean getActive();

    @Value("#{target.attachment_id}")
    UUID getAttachmentId();
}