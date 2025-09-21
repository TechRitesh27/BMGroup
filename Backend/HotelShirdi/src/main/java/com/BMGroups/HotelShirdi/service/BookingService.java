package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.*;
import com.BMGroups.HotelShirdi.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

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
        if (!room.getStatus().equalsIgnoreCase("Available")) {
            throw new RuntimeException("Room is not available");
        }

        room.setStatus("Booked");
        roomRepository.save(room);

        booking.setStatus("Booked");
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        Room room = booking.getRoom();
        room.setStatus("Available");
        roomRepository.save(room);

        booking.setStatus("Cancelled");
        bookingRepository.save(booking);
    }
}