package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemFrontendDto {
    private Long id;
    private String name;
    private String img;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal lineTotal;
}

