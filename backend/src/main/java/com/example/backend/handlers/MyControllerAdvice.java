package com.example.backend.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyControllerAdvice {


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> backendError(Exception e) {
        System.out.println("Error: "+e.getMessage());
        return ResponseEntity.status(500).body("Serverda xatolik");
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validation(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        FieldError fieldError = bindingResult.getFieldError();
        return ResponseEntity.status(400).body(fieldError.getDefaultMessage());
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<?> securityError(InternalAuthenticationServiceException e) {
        return ResponseEntity.status(401).body("Login yoki parol xato");
    }



}
