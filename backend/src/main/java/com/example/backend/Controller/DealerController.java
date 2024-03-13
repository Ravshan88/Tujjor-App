package com.example.backend.Controller;

import com.example.backend.DTO.DealerDTO;
import com.example.backend.Services.DealerService.DealerService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.UUID;

@RestController
@RequestMapping("/api/dealer")
@RequiredArgsConstructor
public class DealerController {
    private final DealerService dealerService;
    private final UniversalServiceFilter universalService;

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalService.pagination(page, limit, request, "dealer");
    }

    @GetMapping
    public HttpEntity<?> getDealers() {
        return ResponseEntity.ok(dealerService.getDealers());
    }

    @PostMapping
    public HttpEntity<?> saveDealer(@RequestBody DealerDTO dealerDTO) {
       try {
           return ResponseEntity.ok(dealerService.addDealer(dealerDTO));
       }catch (DataIntegrityViolationException e) {
           return ResponseEntity.ok("ERR_SAME_PHONE");
       }
    }

    @PutMapping("/{dealerId}")
    public HttpEntity<?> putDealer(@PathVariable("dealerId") String dealerId, @RequestBody DealerDTO dealerDTO) {
        return ResponseEntity.ok(dealerService.updateDealer(UUID.fromString(dealerId), dealerDTO));
    }

    @DeleteMapping("/{dealerId}")
    public HttpEntity<?> deleteDealer(@PathVariable("dealerId") String dealerId) {
        return ResponseEntity.ok(dealerService.deleteDealer(UUID.fromString(dealerId)));
    }
}
