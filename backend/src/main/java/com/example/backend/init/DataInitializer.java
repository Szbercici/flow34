package com.example.backend.init;

import com.example.backend.model.Product;
import com.example.backend.model.Rating;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ProductRepository productRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        // --- ADMIN seed ---
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@local.test");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
            System.out.println(":) Admin user created");
        } else {
            System.out.println(" :_( Admin user already exists");
        }

        // --- PRODUCT seed ---
        seedProductIfMissing(
                "Flow Watermelon",
                BigDecimal.valueOf(12.99),
                "Refreshing watermelon flavored hydration cubes with vitamins and zero sugar",
                "Microdrink",
                "static/images/microdrink-melon.png"
        );

        seedProductIfMissing(
                "Flow Energy",
                BigDecimal.valueOf(14.99),
                "Classic energy drink flavor boosted with caffeine for focus and power.",
                "Microdrink",
                "static/images/microdrink-energy.png"
        );


        seedProductIfMissing(
                "Flow Forest Fruit",
                BigDecimal.valueOf(12.99),
                "A berry mix sensation. Tasty hydration with natural forest fruit flavors.",
                "Microdrink",
                "static/images/microdrink-forest-fruit.png"
        );

        seedProductIfMissing(
                "Flow Lemon",
                BigDecimal.valueOf(12.99),
                "Zesty and fresh lemon flavor. Simple hydration rich in vitamins.",
                "Microdrink",
                "static/images/microdrink-lemon.png"
        );

        seedProductIfMissing(
                "Flow Green Electrolyte (Limited)",
                BigDecimal.valueOf(16.99),
                "Limited edition green formula packed with essential electrolytes for active hydration.",
                "Microdrink",
                "static/images/microdrink-cucumber.png"
        );

        seedProductIfMissing(
                "Flow Cola",
                BigDecimal.valueOf(12.99),
                "The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.",
                "Microdrink",
                "static/images/microdrink-cola.png"
        );

        seedProductIfMissing(
                "Metal Water bottle",
                BigDecimal.valueOf(12.99),
                "Durable and stylish metal water bottle to keep you hydrated on the go.",
                "Water Bottles",
                "static/images/metal-water-bottle.png"
        );

        seedProductIfMissing(
                "Water bottle blue",
                BigDecimal.valueOf(8.99),
                "Lightweight and convenient plastic water bottle for everyday use.",
                "Water Bottles",
                "static/images/blue-water-bottle.png"
        );

        seedProductIfMissing(
                "Water bottle purple",
                BigDecimal.valueOf(12.99),
                "Lightweight and functional water bottle in a vibrant purple color.",
                "Water Bottles",
                "static/images/purple-water-bottle.png"
        );

        seedProductIfMissing(
                "Water bottle red",
                BigDecimal.valueOf(10.99),
                "Lightweight and functional water bottle in a vibrant red color.",
                "Water Bottles",
                "static/images/red-water-bottle.png"
        );
    }

    private void seedProductIfMissing(String name, BigDecimal price, String description, String category, String img) {
        if (productRepository.existsByName(name)) {
            System.out.println(" :_( Product already exists: " + name);
            return;
        }

        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setDescription(description);
        p.setCategory(category);
        p.setImg(img);


        p.setRating(new Rating(0, 0));

        productRepository.save(p);
        System.out.println(" :)Seeded product: " + name);
    }
}
