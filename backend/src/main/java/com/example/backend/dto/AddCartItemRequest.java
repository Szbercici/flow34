package com.example.backend.dto;

import lombok.Data;

@Data
public class AddCartItemRequest {
    private Long productId;
    private int quantity;
}
