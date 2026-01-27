package com.example.backend.security;

import com.example.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private static final String SECRET = "nagyon_titkos_kulcs_legalabb_32_karakter!!!!";
    private static final long ACCESS_TOKEN_MS = 60 * 60 * 1000; // 1 óra
    private static final long REFRESH_EXP_MS = 14L * 24 * 60 * 60 * 1000; // 14 nap

    private SecretKey key() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }


    public String generateAccessToken(User user) {

        return Jwts.builder()
                .subject(user.getUsername())
                .claim("role", user.getRole().name()) // "ADMIN" vagy "USER"
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_MS))
                .signWith(key(), Jwts.SIG.HS256)
                .compact();
    }


    public String generateRefreshToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXP_MS))
                .signWith(key(), Jwts.SIG.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public String extractRole(String token) {
        Object role = parseClaims(token).get("role");
        return role == null ? null : role.toString(); // pl "ADMIN"
    }

    public boolean isValid(String token) {

        try {
            parseClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
