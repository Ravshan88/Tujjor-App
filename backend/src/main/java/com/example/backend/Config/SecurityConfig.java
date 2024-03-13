package com.example.backend.Config;

import com.example.backend.Repository.UsersRepository;
import com.example.backend.handlers.MyAuthEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UsersRepository usersRepository;
    private final MyFilter myFilter;
    private final MyAuthEntryPoint myAuthEntryPoint;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(
                                        "/api/auth/register", "/api/file/getFile/**", "/api/auth/refresh", "/api/auth/login"
                                        , "/api/territory/excel").permitAll()
                                .requestMatchers("/api/**").authenticated()  // Paths starting from /api require authentication
                                .anyRequest().permitAll() // Permit all other paths (before /api)
                ).exceptionHandling(
                        exception -> exception.authenticationEntryPoint(myAuthEntryPoint)
                )
                .addFilterBefore(myFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return username ->
                usersRepository.findByPhone(username).orElseThrow();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
