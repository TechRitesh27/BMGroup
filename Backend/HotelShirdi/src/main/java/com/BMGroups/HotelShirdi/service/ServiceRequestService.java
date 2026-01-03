package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.ServiceRequest;
import com.BMGroups.HotelShirdi.model.ServiceStatus;

import java.util.List;

public interface ServiceRequestService {

    ServiceRequest createServiceRequest(ServiceRequest request);

    ServiceRequest assignRequest(Long requestId, Long staffId);

    ServiceRequest updateRequestStatus(Long requestId, ServiceStatus status);

    List<ServiceRequest> getRequestsByBooking(Long bookingId);

    List<ServiceRequest> getRequestsByStaff(Long staffId);

    List<ServiceRequest> getAllRequests();
}
