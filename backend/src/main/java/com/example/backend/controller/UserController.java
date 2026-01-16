package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDto;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

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
    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userService.getUserDtoByUsername(username);
    }


    @GetMapping("/me")
    public UserDto me(Authentication authentication) {
        return userService.getUserDtoByUsername(authentication.getName());
    }



}
