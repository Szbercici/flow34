package com.example.backend.init;

import com.example.backend.model.Product;
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
            System.out.println(" :-( Admin user already exists");
        }

        if (!userRepository.existsByUsername("proba1")) {
            User admin = new User();
            admin.setUsername("proba1");
            admin.setEmail("proba1@local.test");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.USER);

            userRepository.save(admin);
            System.out.println(":) Proba1 user created");
        } else {
            System.out.println(" :-( Proba1 user already exists");
        }

        // --- PRODUCT seed ---
        seedProductIfMissing(
                "Flow Watermelon",
                BigDecimal.valueOf(12.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Watermelon: A light, summery profile featuring the refreshing and crisp taste of sun-ripened watermelon.",
                "Microdrink",
                "images/microdrink-melon.webp"
        );

        seedProductIfMissing(
                "Flow Energy",
                BigDecimal.valueOf(14.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Energy: A high-performance cube featuring a direct caffeine kick, specifically engineered to provide an immediate energy spike and mental clarity. ",
                "Microdrink",
                "images/microdrink-energy.webp"
        );


        seedProductIfMissing(
                "Flow Forest Fruit",
                BigDecimal.valueOf(12.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Forest Fruit: A sophisticated berry medley that balances the sweetness of raspberries with the tart notes of blackcurrant. ",
                "Microdrink",
                "images/microdrink-forest-fruit.webp"
        );

        seedProductIfMissing(
                "Flow Lemon",
                BigDecimal.valueOf(12.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Lemon: A sharp and invigorating citrus profile featuring zesty lemon notes for maximum refreshment and a clean finish. ",
                "Microdrink",
                "images/microdrink-lemon.webp"
        );

        seedProductIfMissing(
                "Flow Green Electrolyte (Limited)",
                BigDecimal.valueOf(16.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Green Electrolyte: It pairs a clean cucumber-mint taste with Magnesium and Potassium to replenish vital salts, designed for rapid hydration. ",
                "Microdrink",
                "images/microdrink-cucumber.webp"
        );

        seedProductIfMissing(
                "Flow Cola",
                BigDecimal.valueOf(12.99),
                "flow. MICRODRINK is a hydration cube designed to transform plain water into an enjoyable, flavorful experience. These zero-sugar cubes provide \"tasty hydration made simple\" by combining fruit and plant extracts with a targeted blend of essential vitamins and minerals; flow. MICRODRINK – Cola: A familiar, spice-infused blend that delivers the classic cola experience with zero sugar and a metabolic vitamin boost.",
                "Microdrink",
                "images/microdrink-cola.webp"
        );

        seedProductIfMissing(
                "Metal Water bottle",
                BigDecimal.valueOf(12.99),
                "Our metal bottles are crafted from high-grade, non-corrosive stainless steel. The steel interior does not leach flavors or odors into your drink, keeping your water tasting exactly as it should.  ",
                "Water Bottles",
                "images/metal-water-bottle.webp"
        );

        seedProductIfMissing(
                "Water bottle blue",
                BigDecimal.valueOf(8.99),
                "Our plastic bottles are made exclusively from high-quality, BPA-free (Bisphenol-A free) materials. This ensures that no endocrine-disrupting chemicals migrate into your beverage. ",
                "Water Bottles",
                "images/blue-water-bottle.webp"
        );

        seedProductIfMissing(
                "Water bottle purple",
                BigDecimal.valueOf(12.99),
                "Our plastic bottles are made exclusively from high-quality, BPA-free (Bisphenol-A free) materials. This ensures that no endocrine-disrupting chemicals migrate into your beverage. ",
                "Water Bottles",
                "images/purple-water-bottle.webp"
        );

        seedProductIfMissing(
                "Water bottle red",
                BigDecimal.valueOf(10.99),
                "Our plastic bottles are made exclusively from high-quality, BPA-free (Bisphenol-A free) materials. This ensures that no endocrine-disrupting chemicals migrate into your beverage. ",
                "Water Bottles",
                "images/red-water-bottle.webp"
        );
        seedProductIfMissing(
                "Daily Scoop Cactus",
                BigDecimal.valueOf(12.99),
                "flow. DAILY SCOOP is a comprehensive all-in-one daily supplement designed to simplify your wellness routine by combining essential vitamins, high-quality muscle support into a single tasty scoop.For best results, it is recommended to consume one serving per day; flow. DAILY SCOOP – Cactus: A unique, exotic flavor that is light, refreshing, and subtly sweet—perfect for those who want something different from standard fruit flavors. ",
                "Daily Scoop",
                "images/daily-scoop-cactus.webp"
        );
        seedProductIfMissing(
                "Daily Scoop Lemon",
                BigDecimal.valueOf(12.99),
                "flow. DAILY SCOOP is a comprehensive all-in-one daily supplement designed to simplify your wellness routine by combining essential vitamins, high-quality muscle support into a single tasty scoop.For best results, it is recommended to consume one serving per day; flow. DAILY SCOOP – Lemon: A zesty and invigorating citrus profile that offers a crisp, clean taste for a morning or afternoon pick-me-up. ",
                "Daily Scoop",
                "images/daily-scoop-lemon.webp"
        );
        seedProductIfMissing(
                "Daily Scoop Punch",
                BigDecimal.valueOf(12.99),
                "flow. DAILY SCOOP is a comprehensive all-in-one daily supplement designed to simplify your wellness routine by combining essential vitamins, high-quality muscle support into a single tasty scoop.For best results, it is recommended to consume one serving per day; flow. DAILY SCOOP – Punch: A bold and nostalgic fruit medley, bursting with classic tropical and berry notes. ",
                "Daily Scoop",
                "images/daily-scoop-punch.webp"
        );
        seedProductIfMissing(
                "Daily Scoop Unflavored",
                BigDecimal.valueOf(10.99),
                "flow. DAILY SCOOP is a comprehensive all-in-one daily supplement designed to simplify your wellness routine by combining essential vitamins, high-quality muscle support into a single tasty scoop.For best results, it is recommended to consume one serving per day; flow. DAILY SCOOP – Unflavored: A versatile, neutral option designed to be easily stacked with other supplements or mixed into your favorite smoothie without altering the taste. ",
                "Daily Scoop",
                "images/daily-scoop-unflavored.webp"
        );
        seedProductIfMissing(
                "Runner Berry",
                BigDecimal.valueOf(11.99),
                "flow. RUNNER is a premium endurance pre-workout line for athletes, designed to support hydration and delay muscle fatigue. It is not recommended to exceed one serving per day; flow. RUNNER – Berry: A refreshing blend of forest fruits with a balanced sweet and tart profile. ",
                "Runner",
                "images/runner-berry.webp"
        );
        seedProductIfMissing(
                "Runner Citrus",
                BigDecimal.valueOf(11.99),
                "flow. RUNNER is a premium endurance pre-workout line for athletes, designed to support hydration and delay muscle fatigue. It is not recommended to exceed one serving per day; flow. RUNNER – Citrus: A bright, zesty profile featuring sharp lemon and lime notes for maximum refreshment. ",
                "Runner",
                "images/runner-citrus.webp"
        );
        seedProductIfMissing(
                "Runner Orange",
                BigDecimal.valueOf(11.99),
                "flow. RUNNER is a premium endurance pre-workout line for athletes, designed to support hydration and delay muscle fatigue. It is not recommended to exceed one serving per day; flow. RUNNER – Orange: A classic, crisp citrus flavor reminiscent of fresh-pressed oranges. ",
                "Runner",
                "images/runner-orange.webp"
        );
        seedProductIfMissing(
                "Runner Tutti Frutty",
                BigDecimal.valueOf(12.50),
                "flow. RUNNER is a premium endurance pre-workout line for athletes, designed to support hydration and delay muscle fatigue. It is not recommended to exceed one serving per day; flow. RUNNER – Tutti Frutti: A playful, multi-fruit blend offering a sweet and nostalgic tropical candy taste. ",
                "Runner",
                "images/runner-tuttifrutty.webp"
        );
    }

    private void seedProductIfMissing(String name, BigDecimal price, String description, String category, String img) {
        if (productRepository.existsByName(name)) {
            System.out.println(" :-( Product already exists: " + name);
            return;
        }

        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setDescription(description);
        p.setCategory(category);
        p.setImg(img);



        productRepository.save(p);
        System.out.println(" :)Seeded product: " + name);
    }
}
