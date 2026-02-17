package com.example.backend.dto;

public class CartItemInput {
    private Long productId;
    private int quantity;

    public Long getProductId() { return productId; }
    public int getQuantity() { return quantity; }
}
