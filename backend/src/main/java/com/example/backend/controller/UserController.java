package com.example.backend.controller;

import com.example.backend.dto.*;
import org.springframework.security.core.Authentication;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Összes user
    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAll()
                .stream()
                .map(u -> new UserDto(u.getId(), u.getUsername(), u.getEmail()))
                .toList();
    }

    // Egy user
    @GetMapping("/u/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userService.getUserDtoByUsername(username);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String username = authentication.getName();
        return ResponseEntity.ok(userService.getMe(username));
    }

    //USER THEME
    @GetMapping("/me/theme")
    public Map<String, String> getMyTheme(Authentication auth) {
        Long userId = userService.getUserId(auth);
        String theme = userService.getMyTheme(userId);
        return Map.of("theme", theme);
    }

    @PutMapping("/me/theme")
    public Map<String, String> updateMyTheme(
            @RequestBody UpdateThemeRequest req,
            Authentication auth
    ) {
        Long userId = userService.getUserId(auth);
        String theme = userService.updateMyTheme(userId, req.getTheme());
        return Map.of("theme", theme);
    }

    // EMAIL ÁTÍRÁSA

    @PutMapping("/me/email")
    public ResponseEntity<UpdateEmailResponse> updateEmail(
            @RequestBody UpdateEmailRequest request,
            Authentication auth
    ) {
        Long userId = userService.getUserId(auth);
        return ResponseEntity.ok(userService.updateEmail(userId, request.getEmail()));
    }

    @PutMapping("/me/username")
    public ResponseEntity<UpdateUsernameResponse> updateUsername(
            @RequestBody UpdateUsernameRequest request,
            Authentication auth
    ) {
        Long userId = userService.getUserId(auth);
        return ResponseEntity.ok(userService.updateUsername(userId, request.getUsername()));
    }




}
