package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.Booking;
import com.BMGroups.HotelShirdi.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByStatus(String status);
    long countByCheckInDateBetween(LocalDate start, LocalDate end);
    @Query("SELECT FUNCTION('MONTHNAME', b.checkInDate), COUNT(b.id) FROM Booking b GROUP BY FUNCTION('MONTHNAME', b.checkInDate)")
    List<Object[]> countBookingsByMonth();
    @Query("SELECT b.room.roomType.name, SUM(b.room.roomType.price) FROM Booking b GROUP BY b.room.roomType.name")
    List<Object[]> calculateRevenueByRoomType();
    boolean existsByRoomAndStatus(Room room, String status);
}