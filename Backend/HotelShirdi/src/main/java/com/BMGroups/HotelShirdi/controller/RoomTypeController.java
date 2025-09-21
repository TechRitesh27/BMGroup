package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.model.RoomType;
import com.BMGroups.HotelShirdi.service.RoomTypeService;
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

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @DeleteMapping("/{id}")
    public void deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
    }
}