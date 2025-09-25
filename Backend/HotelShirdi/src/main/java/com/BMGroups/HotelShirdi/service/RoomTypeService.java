package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.RoomType;
import com.BMGroups.HotelShirdi.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public RoomType addRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(Long id, RoomType updatedType) {
        RoomType existing = roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room type not found"));

        existing.setName(updatedType.getName());
        existing.setPrice(updatedType.getPrice());
        existing.setFacilities(updatedType.getFacilities());
        existing.setCapacity(updatedType.getCapacity());

        return roomTypeRepository.save(existing);
    }

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public void deleteRoomType(Long id) {
        roomTypeRepository.deleteById(id);
    }
}