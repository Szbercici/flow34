package com.example.backend.dto;

import java.util.List;

public class CartSyncRequest {
    private List<CartItemInput> items;

    public List<CartItemInput> getItems() { return items; }
}
