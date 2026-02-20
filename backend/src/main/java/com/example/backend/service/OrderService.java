package com.example.backend.service;

import com.example.backend.dto.OrderListDto;
import com.example.backend.repository.OrderRepository;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.OrderSummaryProjection;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.example.backend.dto.CreateOrderItemRequest;
import com.example.backend.dto.CreateOrderRequest;
import com.example.backend.dto.CreateOrderResponse;
import com.example.backend.model.Order;
import com.example.backend.model.OrderItem;
import com.example.backend.repository.OrderSummaryProjection;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CreateOrderResponse createOrder(Long userId, CreateOrderRequest req) {

        Order order = new Order();
        order.setUserId(userId);
        order.setAddress(req.getAddress());
        order.setCreatedAt(LocalDateTime.now());

        for (CreateOrderItemRequest item : req.getItems()) {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProductId(item.getProductId());
            oi.setQuantity(item.getQuantity());
            oi.setPrice(item.getPrice()); // később érdemes szerveroldalon termékárból számolni

            order.getItems().add(oi);
        }

        Order saved = orderRepository.save(order);

        return new CreateOrderResponse(true, saved.getId());
    }

    @Transactional(readOnly = true)
    public List<OrderListDto> getMyOrders(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String fullName = buildUserName(user);

        List<OrderSummaryProjection> rows = orderRepository.findOrderSummariesByUserId(userId);

        return rows.stream()
                .map(r -> new OrderListDto(
                        r.getOrderId(),
                        fullName,
                        r.getCreatedAt(),
                        r.getTotalPrice()
                ))
                .toList();
    }

    private String buildUserName(User user) {
        String name = user.getUsername() != null ? user.getUsername().trim() : "";
        return name.isEmpty() ? user.getUsername() : name;
    }
}
