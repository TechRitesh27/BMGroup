package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.DTO.MonthlyBookingStats;
import com.BMGroups.HotelShirdi.DTO.RoomRevenueStats;
import com.BMGroups.HotelShirdi.model.Booking;
import com.BMGroups.HotelShirdi.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/customer/{id}")
    public List<Booking> getBookingsByCustomer(@PathVariable Long id) {
        return bookingService.getBookingsByCustomer(id);
    }

    @DeleteMapping("/{id}")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody String status) {
        bookingService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{bookingId}/assign-room/{roomId}")
    public ResponseEntity<?> assignRoom(@PathVariable Long bookingId, @PathVariable Long roomId) {
        bookingService.assignRoom(bookingId, roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report/monthly-bookings")
    public List<MonthlyBookingStats> getMonthlyBookingStats() {
        return bookingService.getMonthlyStats();
    }

    @GetMapping("/report/room-revenue")
    public List<RoomRevenueStats> getRoomRevenueStats() {
        return bookingService.getRevenueStats();
    }

    @GetMapping("/cleanup-expired")
    public ResponseEntity<String> cleanupExpiredBookings() {
        bookingService.autoCompleteExpiredBookings();
        return ResponseEntity.ok("✅ Expired bookings cleaned up");
    }


}