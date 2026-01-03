package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.*;
import com.BMGroups.HotelShirdi.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final ServiceRequestRepository repository;

    public ServiceRequestServiceImpl(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    @Override
    public ServiceRequest createServiceRequest(ServiceRequest request) {
        request.setStatus(ServiceStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());
        return repository.save(request);
    }

    @Override
    public ServiceRequest assignRequest(Long requestId, Long staffId) {
        ServiceRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getStatus() != ServiceStatus.PENDING) {
            throw new RuntimeException("Only PENDING requests can be assigned");
        }

        request.setAssignedStaffId(staffId);
        request.setAssignedAt(LocalDateTime.now());
        request.setStatus(ServiceStatus.ASSIGNED);

        return repository.save(request);
    }

    @Override
    public ServiceRequest updateRequestStatus(Long requestId, ServiceStatus status) {
        ServiceRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        switch (status) {
            case IN_PROGRESS:
                if (request.getStatus() != ServiceStatus.ASSIGNED) {
                    throw new RuntimeException("Request must be ASSIGNED first");
                }
                break;

            case COMPLETED:
                if (request.getStatus() != ServiceStatus.IN_PROGRESS) {
                    throw new RuntimeException("Request must be IN_PROGRESS to complete");
                }
                request.setCompletedAt(LocalDateTime.now());
                break;

            case CANCELLED:
                // allowed from any state
                break;

            default:
                throw new RuntimeException("Invalid status transition");
        }

        request.setStatus(status);
        return repository.save(request);
    }

    @Override
    public List<ServiceRequest> getRequestsByBooking(Long bookingId) {
        return repository.findByBookingId(bookingId);
    }

    @Override
    public List<ServiceRequest> getRequestsByStaff(Long staffId) {
        return repository.findByAssignedStaffId(staffId);
    }

    @Override
    public List<ServiceRequest> getAllRequests() {
        return repository.findAll();
    }
}
