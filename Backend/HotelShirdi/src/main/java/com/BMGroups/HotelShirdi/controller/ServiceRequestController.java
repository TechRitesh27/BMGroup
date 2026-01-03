package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.model.ServiceRequest;
import com.BMGroups.HotelShirdi.model.ServiceStatus;
import com.BMGroups.HotelShirdi.service.ServiceRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    // ---------------- GUEST ----------------

    // Create new service request
    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(
            @RequestBody ServiceRequest request) {

        ServiceRequest saved = service.createServiceRequest(request);
        return ResponseEntity.ok(saved);
    }

    // View requests by booking ID (guest)
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<ServiceRequest>> getByBooking(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(service.getRequestsByBooking(bookingId));
    }

    // ---------------- ADMIN ----------------

    // View all service requests
    @GetMapping
    public ResponseEntity<List<ServiceRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    // Assign request to staff
    @PutMapping("/{id}/assign/{staffId}")
    public ResponseEntity<ServiceRequest> assignRequest(
            @PathVariable Long id,
            @PathVariable Long staffId) {

        return ResponseEntity.ok(service.assignRequest(id, staffId));
    }

    // ---------------- STAFF ----------------

    // View assigned requests
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<ServiceRequest>> getByStaff(
            @PathVariable Long staffId) {

        return ResponseEntity.ok(service.getRequestsByStaff(staffId));
    }

    // Update request status
    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam ServiceStatus status) {

        return ResponseEntity.ok(service.updateRequestStatus(id, status));
    }
}
