package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.model.RoomType;
import com.BMGroups.HotelShirdi.service.RoomTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @PostMapping
    public RoomType addRoomType(@RequestBody RoomType roomType) {
        return roomTypeService.addRoomType(roomType);
    }

    @PutMapping("/{id}") // ✅ corrected path
    public ResponseEntity<RoomType> updateRoomType(@PathVariable Long id, @RequestBody RoomType updatedType) {
        RoomType roomType = roomTypeService.updateRoomType(id, updatedType); // ✅ delegate to service
        return ResponseEntity.ok(roomType);
    }

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @DeleteMapping("/{id}")
    public void deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
    }
}