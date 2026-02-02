package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.model.Rating;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final Map<Long, Product> products = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong(0);

    public ProductService() {
        // Kezdő mock adatok

    }

    private void seed(Product p) {
        long id = idCounter.incrementAndGet();
        p.setId(id);
        products.put(id, p);
    }

    public List<Product> getAllProducts() {
        return products.values().stream()
                .sorted(Comparator.comparing(Product::getId))
                .toList();
    }

    public Optional<Product> getById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product create(Product product) {
        long id = idCounter.incrementAndGet();
        product.setId(id);

        if (product.getRating() == null) {
            product.setRating(new Rating(0.0, 0));
        }

        products.put(id, product);
        return product;
    }

    public Optional<Product> update(Long id, Product updated) {
        Product existing = products.get(id);
        if (existing == null) return Optional.empty();

        updated.setId(id); // path ID a biztos
        if (updated.getRating() == null) {
            updated.setRating(existing.getRating());
        }

        products.put(id, updated);
        return Optional.of(updated);
    }

    public boolean delete(Long id) {
        return products.remove(id) != null;
    }
}
