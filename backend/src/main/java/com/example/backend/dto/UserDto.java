package com.example.backend.dto;


import com.example.backend.model.Role;

public record UserDto(Long id, String username, String email, Role ROLE) {}
