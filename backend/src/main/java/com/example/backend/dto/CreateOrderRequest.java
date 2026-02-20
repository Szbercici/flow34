package com.example.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    @NotEmpty(message = "items must not be empty")
    private List<@Valid CreateOrderItemRequest> items;
}