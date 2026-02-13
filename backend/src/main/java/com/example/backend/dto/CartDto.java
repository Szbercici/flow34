package com.example.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record CartDto(
        Long cartId,
        List<CartItemDto> items,
        int totalItems,
        BigDecimal totalPrice
) {}
