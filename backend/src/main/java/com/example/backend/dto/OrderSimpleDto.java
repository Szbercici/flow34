package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderSimpleDto {
    private Long orderId;
    private String address;
    private LocalDateTime createdAt;
    private Integer itemCount;
    private BigDecimal totalPrice;
}