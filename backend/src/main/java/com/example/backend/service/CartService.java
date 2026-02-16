package com.example.backend.service;

import com.example.backend.dto.CartDto;
import com.example.backend.dto.CartItemDto;
import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.Product;
import com.example.backend.repository.CartItemRepository;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    // Controller NE nyúljon ehhez, ez belső logika
    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(userId)));
    }

    public CartDto getCartDto(Long userId) {
        Cart cart = getOrCreateCart(userId);

        List<CartItem> items = cartItemRepository.findAllByCartId(cart.getId());

        // DTO mapping + összesítés
        List<CartItemDto> itemDtos = items.stream().map(ci -> {
            Product p = ci.getProduct(); // lazy tranzakción belül
            BigDecimal unit = p.getPrice();
            int qty = ci.getQuantity();
            BigDecimal lineTotal = unit.multiply(BigDecimal.valueOf(qty));

            return new CartItemDto(
                    p.getId(),
                    p.getName(),
                    p.getImg(),
                    unit,
                    qty,
                    lineTotal
            );
        }).toList();

        int totalItems = itemDtos.stream().mapToInt(CartItemDto::quantity).sum();
        BigDecimal totalPrice = itemDtos.stream()
                .map(CartItemDto::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDto(cart.getId(), itemDtos, totalItems, totalPrice);
    }

    public CartDto addItem(Long userId, Long productId, int qty) {
        if (qty <= 0) throw new IllegalArgumentException("quantity must be > 0");

        Cart cart = getOrCreateCart(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), productId)
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setProduct(product);
                    newItem.setQuantity(0);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + qty);
        cartItemRepository.save(item);

        return getCartDto(userId); // friss kosár DTO vissza
    }

    public CartDto removeItem(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteByCartIdAndProductId(cart.getId(), productId);
        return getCartDto(userId);
    }

    public CartDto clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteAllByCartId(cart.getId());
        return getCartDto(userId);
    }
}
