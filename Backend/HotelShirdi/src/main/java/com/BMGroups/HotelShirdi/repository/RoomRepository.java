package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(String status);
    List<Room> findByRoomType_Name(String name); // e.g., "Deluxe"
    long countByStatus(String status);
}
