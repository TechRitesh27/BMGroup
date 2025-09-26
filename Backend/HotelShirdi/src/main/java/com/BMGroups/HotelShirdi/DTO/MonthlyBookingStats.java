package com.BMGroups.HotelShirdi.DTO;

public class MonthlyBookingStats {
    private String month;
    private Long count;

    public MonthlyBookingStats(String month, Long count) {
        this.month = month;
        this.count = count;
    }

    public String getMonth() {
        return month;
    }

    public Long getCount() {
        return count;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}