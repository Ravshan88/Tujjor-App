package com.example.backend.Services.Universal;

import com.example.backend.Payload.Request.FilterData;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Data
@AllArgsConstructor
@NotBlank
@Builder
public class PaginationConfig {
    private String component;
    private Page pagination;
    private FilterData filterData;
    private Pageable pageable;

}
