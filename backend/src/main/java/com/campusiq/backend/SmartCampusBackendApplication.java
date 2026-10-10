package com.campusiq.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartCampusBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartCampusBackendApplication.class, args);
        System.out.println("==================================================");
        System.out.println("CampusIQ Spring Boot REST API is running on port 8080");
        System.out.println("Base URL: http://localhost:8080/api");
        System.out.println("==================================================");
    }
}
