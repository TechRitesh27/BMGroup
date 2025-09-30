package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByDestinationContainingIgnoreCase(String destination);
}
