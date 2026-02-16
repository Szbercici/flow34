package com.example.backend.dto;

import java.math.BigDecimal;

public record CartItemDto(
        Long productId,
        String name,
        String img,
        BigDecimal unitPrice,
        int quantity,
        BigDecimal lineTotal
) {}
