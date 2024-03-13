package com.example.backend.Controller;

import com.example.backend.Services.ExcelService.ExcelService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/excel")
@RequiredArgsConstructor
public class ExcelController {
    private final ExcelService service;

    @GetMapping
    public ResponseEntity<Resource> getExcel(@RequestParam String columns, HttpServletRequest request, @RequestParam String component, HttpServletResponse response) {
        return service.getExcel(request,columns.split("\\."),component,response);
    }
}
