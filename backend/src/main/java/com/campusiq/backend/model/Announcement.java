package com.campusiq.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "announcements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String priority;
    private String category;
    private String date;
    private String author;

    @Column(length = 2000)
    private String content;
}
