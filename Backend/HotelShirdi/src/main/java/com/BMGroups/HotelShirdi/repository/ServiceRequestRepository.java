package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByBookingId(Long bookingId);

    List<ServiceRequest> findByAssignedStaffId(Long staffId);
}
