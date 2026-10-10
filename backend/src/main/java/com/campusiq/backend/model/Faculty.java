package com.campusiq.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faculties")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String department;
    private String email;
    private String office;
    private String phone;
    private String officeHours;
    private String specialization;
    private String avatar;
}
