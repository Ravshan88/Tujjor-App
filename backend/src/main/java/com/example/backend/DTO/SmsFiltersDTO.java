package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmsFiltersDTO {
    List<String> city = new ArrayList<>();
    List<Integer> customerCategories = new ArrayList<>();
}
