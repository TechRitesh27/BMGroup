package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.Room;
import com.BMGroups.HotelShirdi.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

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