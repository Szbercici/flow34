package com.example.backend.controller;

import com.example.backend.dto.CartDto;
import com.example.backend.dto.CartItemInput;
import com.example.backend.service.CartService;
import com.example.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    private final UserService userService;
    private final CartService cartService;

    public CartController(UserService userService, CartService cartService) {
        this.userService = userService;
        this.cartService = cartService;
    }

    @GetMapping("/cart")
    public CartDto getCart(Authentication auth) {
        Long userId = userService.getUserId(auth);
        return cartService.getCartDto(userId);
    }

    @PutMapping("/cart")
    public CartDto syncCart(@RequestBody List<CartItemInput> items, Authentication auth) {
        Long userId = userService.getUserId(auth);
        return cartService.syncCart(userId, items);
    }


    @DeleteMapping("/cart/items/{productId}")
    public CartDto remove(Authentication auth, @PathVariable Long productId) {
        Long userId = userService.getUserId(auth);
        return cartService.removeItem(userId, productId);
    }

    @DeleteMapping("/cart")
    public CartDto clear(Authentication auth) {
        Long userId = userService.getUserId(auth);
        return cartService.clearCart(userId);
    }


}
