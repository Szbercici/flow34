package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderFrontendDto {
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private List<OrderItemFrontendDto> items;
}

