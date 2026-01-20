package com.example.backend.controller;

import com.example.backend.dto.TokenResponse;
import com.example.backend.dto.UserDto;
import com.example.backend.security.JwtService;
import com.example.backend.model.User;
import com.example.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseCookie;

import java.time.Duration;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // FRONTENDNEK KELL!!
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        try {
            userService.register(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getUsername(), request.getPassword());

        String access = jwtService.generateAccessToken(user.getUsername());
        String refresh = jwtService.generateRefreshToken(user.getUsername());

        ResponseCookie accessCookie = ResponseCookie.from("access_token", access)
                .httpOnly(true)
                .secure(false) // localhoston false, élesben true
                .sameSite("Lax") // devre oké; ha nagyon akarsz: "Strict"
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refresh)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/api/auth/refresh")
                .maxAge(Duration.ofDays(14))
                .build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(new UserDto(user.getId(), user.getUsername(), user.getEmail()));
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String refresh = null;
        var cookies = request.getCookies();
        if (cookies != null) {
            for (var c : cookies) {
                if ("refresh_token".equals(c.getName())) refresh = c.getValue();
            }
        }

        if (refresh == null || !jwtService.isValid(refresh)) {
            return ResponseEntity.status(401).body("No/invalid refresh token");
        }

        String username = jwtService.extractUsername(refresh);
        String newAccess = jwtService.generateAccessToken(username);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", newAccess)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
                .body("refreshed");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie accessCookie = ResponseCookie.from("access_token", "")
                .httpOnly(true).secure(false).sameSite("Lax")
                .path("/").maxAge(0).build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true).secure(false).sameSite("Lax")
                .path("/api/auth/refresh").maxAge(0).build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body("logged out");
    }


}
