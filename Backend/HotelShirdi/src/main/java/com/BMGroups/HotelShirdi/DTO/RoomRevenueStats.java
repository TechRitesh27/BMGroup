package com.BMGroups.HotelShirdi.DTO;

public class RoomRevenueStats {
    private String roomType;
    private Double totalRevenue;

    public RoomRevenueStats(String roomType, Double totalRevenue) {
        this.roomType = roomType;
        this.totalRevenue = totalRevenue;
    }

    public String getRoomType() {
        return roomType;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}