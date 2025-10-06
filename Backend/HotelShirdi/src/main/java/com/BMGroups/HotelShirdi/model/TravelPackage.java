package com.BMGroups.HotelShirdi.model;

import jakarta.persistence.*;

@Entity
public class TravelPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String destination;
    private String description;
    private Double price;
    private Integer durationDays;

    public TravelPackage() {};

    public TravelPackage(Long id, String title, String destination, String description, Double price, Integer durationDays) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.description = description;
        this.price = price;
        this.durationDays = durationDays;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    // Optional: link to Booking or Customer
    // @ManyToOne
    // private Booking booking;
}
