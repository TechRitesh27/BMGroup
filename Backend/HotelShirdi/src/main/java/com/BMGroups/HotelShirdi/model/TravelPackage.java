package com.BMGroups.HotelShirdi.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String startLocation;
    private String endLocation;
    private String destination;
    private String description;
    private Double price;
    private Integer durationDays;
    private LocalDate travelStartDate;
    private LocalDate bookingLastDate;


    private String routeLink; // Google Maps route link (free, clickable)

    @ElementCollection
    private List<String> routeStops;

    @ElementCollection
    private List<String> itinerary;

    @ElementCollection
    private List<String> highlights;

    @ElementCollection
    private List<String> imageUrls; // ✅ Moved here for consistency

    public TravelPackage() {}

    // Getters and Setters

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

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
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

    public String getRouteLink() {
        return routeLink;
    }

    public void setRouteLink(String routeLink) {
        this.routeLink = routeLink;
    }

    public List<String> getRouteStops() {
        return routeStops;
    }

    public void setRouteStops(List<String> routeStops) {
        this.routeStops = routeStops;
    }

    public List<String> getItinerary() {
        return itinerary;
    }

    public void setItinerary(List<String> itinerary) {
        this.itinerary = itinerary;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public LocalDate getTravelStartDate() {
        return travelStartDate;
    }

    public void setTravelStartDate(LocalDate travelStartDate) {
        this.travelStartDate = travelStartDate;
    }

    public LocalDate getBookingLastDate() {
        return bookingLastDate;
    }

    public void setBookingLastDate(LocalDate bookingLastDate) {
        this.bookingLastDate = bookingLastDate;
    }
}