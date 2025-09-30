package com.BMGroups.HotelShirdi.service;

import com.BMGroups.HotelShirdi.model.Booking;
import com.BMGroups.HotelShirdi.model.Customer;
import com.BMGroups.HotelShirdi.model.TravelPackage;
import com.BMGroups.HotelShirdi.repository.BookingRepository;
import com.BMGroups.HotelShirdi.repository.CustomerRepository;
import com.BMGroups.HotelShirdi.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TravelPackageService {

    private final TravelPackageRepository repo;
    private final CustomerRepository customerRepo;
    private final BookingRepository bookingRepo;

    public TravelPackageService(
            TravelPackageRepository repo,
            CustomerRepository customerRepo,
            BookingRepository bookingRepo
    ) {
        this.repo = repo;
        this.customerRepo = customerRepo;
        this.bookingRepo = bookingRepo;
    }

    public void bookPackage(Long packageId, Long customerId) {
        TravelPackage pkg = repo.findById(packageId).orElseThrow();
        Customer customer = customerRepo.findById(customerId).orElseThrow();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setTravelPackage(pkg);
        booking.setStatus("Confirmed");
        booking.setCheckInDate(LocalDate.now());
        booking.setCheckOutDate(LocalDate.now().plusDays(pkg.getDurationDays()));

        bookingRepo.save(booking);
    }

    public List<TravelPackage> getAllPackages() {
        return repo.findAll();
    }

    public TravelPackage getPackageById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public TravelPackage createPackage(TravelPackage pkg) {
        return repo.save(pkg);
    }

    public void deletePackage(Long id) {
        repo.deleteById(id);
    }

    public List<TravelPackage> searchByDestination(String destination) {
        return repo.findByDestinationContainingIgnoreCase(destination);
    }

    public TravelPackage updatePackage(Long id, TravelPackage updated) {
        TravelPackage pkg = repo.findById(id).orElseThrow();
        pkg.setTitle(updated.getTitle());
        pkg.setDestination(updated.getDestination());
        pkg.setDescription(updated.getDescription());
        pkg.setPrice(updated.getPrice());
        pkg.setDurationDays(updated.getDurationDays());
        return repo.save(pkg);
    }

}
