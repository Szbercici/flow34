package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderListDto {
    private Long orderId;
    private String userName;
    private LocalDateTime createdAt;
    private BigDecimal totalPrice;
}
