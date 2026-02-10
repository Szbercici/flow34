package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.model.Rating;
import com.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getById(Long id) {
        return productRepository.findById(id);
    }

    public Product create(Product product) {
        if (product.getRating() == null) {
            product.setRating(new Rating(0.0, 0));
        }
        return productRepository.save(product);
    }

    public Optional<Product> update(Long id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            updated.setId(id);

            if (updated.getRating() == null) {
                updated.setRating(existing.getRating());
            }

            return productRepository.save(updated);
        });
    }

    public boolean delete(Long id) {
        if (!productRepository.existsById(id)) return false;
        productRepository.deleteById(id);
        return true;
    }
}
