package com.example.backend.model;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private String description;
    private String category;
    private String img;
    @Embedded
    private Rating rating;

    public Product() {
    }

    public Product(Long id, String name, BigDecimal price, String description,
                   String category, String img, Rating rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.img = img;
        this.rating = rating;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String Name) { this.name = Name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }

    public Rating getRating() { return rating; }
    public void setRating(Rating rating) { this.rating = rating; }
}
