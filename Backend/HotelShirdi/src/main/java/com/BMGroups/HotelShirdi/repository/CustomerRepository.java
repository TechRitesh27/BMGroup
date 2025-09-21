package com.BMGroups.HotelShirdi.repository;

import com.BMGroups.HotelShirdi.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}