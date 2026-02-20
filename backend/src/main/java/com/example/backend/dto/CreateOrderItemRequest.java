package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateOrderItemRequest {

    @JsonAlias({"id"})          // what i get from frontend
    private Long productId;     // the real name in here

    private Integer quantity;
    private BigDecimal price;
}
