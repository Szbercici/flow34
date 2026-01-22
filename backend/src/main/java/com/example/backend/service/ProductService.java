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
        // Kezdő mock adatok
        seed(new Product(null,
                "Flow Watermelon",
                12.99,
                "Refreshing watermelon flavored hydration cubes with vitamins and zero sugar",
                "Microdrink",
                "images/microdrink-melon.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Energy",
                14.99,
                "Classic energy drink flavor boosted with caffeine for focus and power.",
                "Microdrink",
                "images/microdrink-energy.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Forest Fruit",
                12.99,
                "A berry mix sensation. Tasty hydration with natural forest fruit flavors.",
                "Microdrink",
                "images/microdrink-forest-fruit.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Lemon",
                12.99,
                "Zesty and fresh lemon flavor. Simple hydration rich in vitamins.",
                "Microdrink",
                "images/microdrink-lemon.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Green Electrolyte (Limited)",
                16.99,
                "Limited edition green formula packed with essential electrolytes for active hydration.",
                "Microdrink",
                "images/microdrink-cucumber.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Flow Cola",
                12.99,
                "The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.",
                "Microdrink",
                "images/microdrink-cola.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Metal Water bottle",
                12.99,
                "Durable and stylish metal water bottle to keep you hydrated on the go.",
                "Water Bottles",
                "images/metal-water-bottle.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Water bottle blue",
                8.99,
                "Lightweight and convenient plastic water bottle for everyday use.",
                "Water Bottles",
                "images/blue-water-bottle.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Water bottle purple",
                12.99,
                "Lightweight and functional water bottle in a vibrant purple color.",
                "Water Bottles",
                "images/purple-water-bottle.png",
                new Rating(0, 0)));

        seed(new Product(null,
                "Water bottle red",
                10.99,
                "Lightweight and functional water bottle in a vibrant red color.",
                "Water Bottles",
                "images/red-water-bottle.png",
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
