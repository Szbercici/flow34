package com.example.backend.controller;

import org.springframework.security.core.Authentication;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        String username = authentication.getName(); // ez a principal (username)
        return ResponseEntity.ok(userService.getMe(username));
    }


}
