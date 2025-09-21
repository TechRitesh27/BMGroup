package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByStatus(String status);
    long countByCheckInDateBetween(LocalDate start, LocalDate end);
}