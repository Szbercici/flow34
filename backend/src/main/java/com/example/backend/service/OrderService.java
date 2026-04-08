package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.model.Order;
import com.example.backend.model.OrderItem;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
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
            oi.setPrice(item.getPrice());

            order.getItems().add(oi);
        }

        Order saved = orderRepository.save(order);
        return new CreateOrderResponse(true, saved.getId());
    }

    @Transactional(readOnly = true)
    public OrderFrontendDto getOrderForFrontend(Long userId, Long orderId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<OrderItemFrontendDto> items = order.getItems().stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

                    return new OrderItemFrontendDto(
                            product.getId(),
                            product.getName(),
                            product.getImg(),
                            item.getPrice(),
                            item.getQuantity(),
                            item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                    );
                })
                .toList();

        return new OrderFrontendDto(
                user.getUsername(),
                "",
                user.getEmail(),
                order.getAddress(),
                items
        );
    }

    @Transactional(readOnly = true)
    public List<OrderSimpleDto> getMyOrders(Long userId) {
        return orderRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(order -> {
                    int itemCount = order.getItems().stream()
                            .mapToInt(OrderItem::getQuantity)
                            .sum();

                    BigDecimal totalPrice = order.getItems().stream()
                            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    return new OrderSimpleDto(
                            order.getId(),
                            order.getAddress(),
                            order.getCreatedAt(),
                            itemCount,
                            totalPrice
                    );
                })
                .toList();
    }

    public List<OrderFrontendDto> getOrdersByUserIdForAdmin(Long userId) {

        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return orders.stream().map(order -> {

            List<OrderItemFrontendDto> items = order.getItems().stream().map(item -> {

                Product product = productRepository.findById(item.getProductId())
                        .orElse(null);

                String name = product != null ? product.getName() : "Törölt termék";
                String img = product != null ? product.getImg() : null;

                return new OrderItemFrontendDto(
                        item.getProductId(),
                        name,
                        img,
                        item.getPrice(),
                        item.getQuantity(),
                        item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                );

            }).toList();

            return new OrderFrontendDto(
                    null,
                    null,
                    null,
                    order.getAddress(),
                    items
            );

        }).toList();
    }
}