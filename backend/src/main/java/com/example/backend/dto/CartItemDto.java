package com.example.backend.dto;

import java.math.BigDecimal;

public record CartItemDto(

        Long id,
        String name,
        String img,
        BigDecimal price,
        int quantity,
        BigDecimal lineTotal
) {}
