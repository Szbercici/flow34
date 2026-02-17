package com.example.backend.service;

import com.example.backend.dto.CartDto;
import com.example.backend.dto.CartItemDto;
import com.example.backend.dto.CartItemInput;
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
import java.util.Optional;

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



    @Transactional
    public CartDto addItemToCart(Long userId, Long productId, int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be >= 1");
        }

        Cart cart = getOrCreateCart(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return getCartDto(userId);
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

    @Transactional
    public CartDto syncCart(Long userId, List<CartItemInput> items) {
        Cart cart = getOrCreateCart(userId);

        java.util.Map<Long, Integer> desired = new java.util.HashMap<>();
        if (items != null) {
            for (CartItemInput it : items) {
                if (it == null || it.getProductId() == null) continue;
                if (it.getQuantity() <= 0) continue;
                desired.merge(it.getProductId(), it.getQuantity(), Integer::sum);
            }
        }

        List<CartItem> existingItems = cartItemRepository.findAllByCartId(cart.getId());

        for (CartItem ci : existingItems) {
            Long pid = ci.getProduct().getId();
            Integer newQty = desired.remove(pid);

            if (newQty == null) {
                cartItemRepository.delete(ci);
            } else {
                ci.setQuantity(newQty);
                cartItemRepository.save(ci);
            }
        }

        for (var e : desired.entrySet()) {
            Long productId = e.getKey();
            int qty = e.getValue();

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

            CartItem ci = new CartItem();
            ci.setCart(cart);
            ci.setProduct(product);
            ci.setQuantity(qty);

            cartItemRepository.save(ci);
        }

        return getCartDto(userId);
    }

}
