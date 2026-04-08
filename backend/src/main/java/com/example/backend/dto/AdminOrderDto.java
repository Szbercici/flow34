package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminOrderDto {
    private Long orderId;
    private Long userId;
    private String username;
    private String email;
    private String address;
    private LocalDateTime createdAt;
    private Integer totalItems;
    private List<OrderItemFrontendDto> items;
}