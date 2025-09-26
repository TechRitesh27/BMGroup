package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.Room;
import com.BMGroups.HotelShirdi.repository.BookingRepository;
import com.BMGroups.HotelShirdi.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Check for active booking conflict
        boolean isBooked = bookingRepository.existsByRoomAndStatus(existing, "Booked");

        if (isBooked && "Available".equalsIgnoreCase(updatedRoom.getStatus())) {
            throw new IllegalStateException("Cannot mark room as available while it's booked by a customer");
        }

        existing.setRoomNumber(updatedRoom.getRoomNumber());
        existing.setStatus(updatedRoom.getStatus());
        existing.setRoomType(updatedRoom.getRoomType());

        return roomRepository.save(existing);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("Available");
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}