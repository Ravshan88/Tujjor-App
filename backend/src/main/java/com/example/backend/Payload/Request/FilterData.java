package com.example.backend.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterData {
    private String plan;
    private List<UUID> cities;
    private Integer page;
    private String limit;
    private List<Integer> customerCategories;
    private List<Boolean> active;
    private String tin;
    private String quickSearch;
}
