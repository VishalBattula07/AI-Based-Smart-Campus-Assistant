package com.campusiq.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "timetables")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String time;
    private String subject;
    private String code;
    private String room;
    private String faculty;
    private String day;
    private String status;
    private String type;
}
