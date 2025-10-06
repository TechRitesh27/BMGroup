package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.repository.BookingRepository;
import com.BMGroups.HotelShirdi.repository.RoomRepository;
import org.springframework.web.bind.annotation.*;
import com.BMGroups.HotelShirdi.repository.TravelPackageRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final TravelPackageRepository travelPackageRepo;


    public AdminDashboardController(RoomRepository roomRepository, BookingRepository bookingRepository, TravelPackageRepository travelPackageRepo) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.travelPackageRepo = travelPackageRepo;

    }

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.countByStatus("Available");
        long totalBookings = bookingRepository.count();
        long upcomingCheckIns = bookingRepository.countByCheckInDateBetween(
                LocalDate.now(), LocalDate.now().plusDays(1));

        stats.put("totalRooms", totalRooms);
        stats.put("availableRooms", availableRooms);
        stats.put("totalBookings", totalBookings);
        stats.put("upcomingCheckIns", upcomingCheckIns);
        stats.put("totalPackages", travelPackageRepo.count());

        return stats;
    }
}