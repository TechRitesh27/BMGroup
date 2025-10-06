package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.DTO.MonthlyBookingStats;
import com.BMGroups.HotelShirdi.DTO.RoomRevenueStats;
import com.BMGroups.HotelShirdi.model.*;
import com.BMGroups.HotelShirdi.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public Booking createBooking(Booking booking) {
        Room room = roomRepository.findById(booking.getRoom().getId()).orElseThrow();

        List<Booking> existingBookings = bookingRepository.findByRoom(room);
        for (Booking b : existingBookings) {
            if (b.getCheckInDate().isBefore(booking.getCheckOutDate()) &&
                    b.getCheckOutDate().isAfter(booking.getCheckInDate())) {
                throw new RuntimeException("Room is already booked for the selected dates");
            }
        }

        booking.setStatus("Booked");
        return bookingRepository.save(booking);
    }


    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    private void releaseRoom(Room room) {
        if (room != null) {
            room.setStatus("Available");
            roomRepository.save(room);
        }
    }

    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        releaseRoom(booking.getRoom());
        booking.setStatus("Cancelled");
        bookingRepository.save(booking);
    }

    public void updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);

        if ("Cancelled".equalsIgnoreCase(status) || "Completed".equalsIgnoreCase(status)) {
            releaseRoom(booking.getRoom());
        }

        bookingRepository.save(booking);
    }

    public void assignRoom(Long bookingId, Long roomId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        Room newRoom = roomRepository.findById(roomId).orElseThrow();

        releaseRoom(booking.getRoom()); // release old room
        booking.setRoom(newRoom);
        bookingRepository.save(booking);

        newRoom.setStatus("Booked");
        roomRepository.save(newRoom);
    }


    public List<MonthlyBookingStats> getMonthlyStats() {
        List<Object[]> raw = bookingRepository.countBookingsByMonth();
        return raw.stream()
                .map(row -> new MonthlyBookingStats((String) row[0], (Long) row[1]))
                .collect(Collectors.toList());
    }

    public List<RoomRevenueStats> getRevenueStats() {
        List<Object[]> raw = bookingRepository.calculateRevenueByRoomType();
        return raw.stream()
                .map(row -> new RoomRevenueStats((String) row[0], (Double) row[1]))
                .collect(Collectors.toList());
    }

//    public void autoCompleteExpiredBookings() {
//        List<Booking> activeBookings = bookingRepository.findByStatus("Booked");
//
//        LocalDate today = LocalDate.now();
//
//        for (Booking booking : activeBookings) {
//            if (booking.getCheckOutDate().isBefore(today)) {
//                booking.setStatus("Completed");
//                releaseRoom(booking.getRoom());
//                bookingRepository.save(booking);
//            }
//        }
//    }

    @Scheduled(cron = "0 0 0 * * ?") // Runs every day at 00:00 (midnight)
    public void autoCompleteExpiredBookings() {
        List<Booking> activeBookings = bookingRepository.findByStatus("Booked");
        LocalDate today = LocalDate.now();

        for (Booking booking : activeBookings) {
            if (booking.getCheckOutDate().isBefore(today)) {
                booking.setStatus("Completed");
                releaseRoom(booking.getRoom());
                bookingRepository.save(booking);
            }
        }
    }

}