package com.example.backend.controller;

import com.example.backend.dto.CreateOrderRequest;
import com.example.backend.dto.CreateOrderResponse;
import com.example.backend.dto.OrderSimpleDto;
import com.example.backend.service.OrderService;
import com.example.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.OrderFrontendDto;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    // ORDER POST
    @PostMapping
    public ResponseEntity<CreateOrderResponse> createOrder(
            @RequestBody CreateOrderRequest request,
            Authentication auth
    ) {
        Long userId = userService.getUserId(auth);
        CreateOrderResponse response = orderService.createOrder(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderSimpleDto>> getMyOrders(Authentication auth) {
        Long userId = userService.getUserId(auth);
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderFrontendDto> getOrderDetails(
            @PathVariable Long orderId,
            Authentication auth
    ) {
        Long userId = userService.getUserId(auth);
        return ResponseEntity.ok(orderService.getOrderForFrontend(userId, orderId));
    }
}
