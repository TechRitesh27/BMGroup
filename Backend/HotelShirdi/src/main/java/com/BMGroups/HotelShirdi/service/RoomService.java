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
