package com.BMGroups.HotelShirdi.controller;

import com.BMGroups.HotelShirdi.model.TravelPackage;
import com.BMGroups.HotelShirdi.repository.TravelPackageRepository;
import com.BMGroups.HotelShirdi.service.TravelPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/travel-packages")
public class TravelPackageController {

    private final TravelPackageService service;

    public TravelPackageController(TravelPackageService service) {
        this.service = service;
    }

    @GetMapping
    public List<TravelPackage> getAll() {
        return service.getAllPackages();
    }

    @GetMapping("/{id}")
    public TravelPackage getById(@PathVariable Long id) {
        return service.getPackageById(id);
    }

    @PostMapping
    public TravelPackage create(@RequestBody TravelPackage pkg) {
        return service.createPackage(pkg);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletePackage(id);
    }

    @GetMapping("/search")
    public List<TravelPackage> search(@RequestParam String destination) {
        return service.searchByDestination(destination);
    }

    @PostMapping("/book/{packageId}/customer/{customerId}")
    public ResponseEntity<?> bookPackage(@PathVariable Long packageId, @PathVariable Long customerId) {
        service.bookPackage(packageId, customerId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TravelPackage> updatePackage(@PathVariable Long id, @RequestBody TravelPackage updated) {
        TravelPackage updatedPkg = service.updatePackage(id, updated);
        return ResponseEntity.ok(updatedPkg);
    }

}
