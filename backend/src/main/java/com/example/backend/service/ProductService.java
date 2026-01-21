package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.model.Rating;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final Map<Long, Product> products = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong(0);

    public ProductService() {
        // Kezdő mock adatok (FakeStore jelleg)
        seed(new Product(null,
                "Flow Watermelon",
                12.99,
                "Refreshing watermelon flavored hydration cubes with vitamins and zero sugar",
                "Microdrink",
                "uploads/images/melon.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Energy",
                14.99,
                "Classic energy drink flavor boosted with caffeine for focus and power.",
                "Energy",
                "uploads/images/energy.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Forest Fruit",
                12.99,
                "A berry mix sensation. Tasty hydration with natural forest fruit flavors.",
                "Microdrink",
                "uploads/images/erdei.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Lemon",
                12.99,
                "Zesty and fresh lemon flavor. Simple hydration rich in vitamins.",
                "Microdrink",
                "uploads/images/lemon.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Green Electrolyte (Limited)",
                16.99,
                "Limited edition green formula packed with essential electrolytes for active hydration.",
                "Electrolytes",
                "uploads/images/zold.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Cola",
                12.99,
                "The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.",
                "Microdrink",
                "uploads/images/cola.png",
                new Rating(0, 0)));
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
