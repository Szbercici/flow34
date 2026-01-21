package com.example.backend.model;

public class Product {
    private Long id;
    private String name;
    private double price;
    private String description;
    private String category;
    private String image;
    private Rating rating;

    public Product() {
    }

    public Product(Long id, String name, double price, String description,
                   String category, String image, Rating rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return name; }
    public void setTitle(String title) { this.name = title; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Rating getRating() { return rating; }
    public void setRating(Rating rating) { this.rating = rating; }
}
