package com.example.backend.controller;

import com.example.backend.dto.CartDto;
import com.example.backend.service.CartService;
import com.example.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/cart/items")
    public CartDto addToCart(Authentication auth,
                             @RequestParam Long productId,
                             @RequestParam int quantity) {
        Long userId = userService.getUserId(auth);
        return cartService.addItem(userId, productId, quantity);
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
