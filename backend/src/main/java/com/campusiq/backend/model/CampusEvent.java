package com.campusiq.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampusEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String date;
    private String displayDate;
    private String time;
    private String location;

    @Column(length = 2000)
    private String description;

    private Boolean registered;
    private String capacity;
    private String tagColor;
}
