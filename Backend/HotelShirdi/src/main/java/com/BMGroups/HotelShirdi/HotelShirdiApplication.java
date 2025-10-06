package com.BMGroups.HotelShirdi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class HotelShirdiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelShirdiApplication.class, args);
	}
}