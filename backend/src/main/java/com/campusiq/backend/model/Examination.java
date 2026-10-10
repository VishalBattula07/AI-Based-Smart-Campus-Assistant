package com.campusiq.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "examinations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String code;
    private String date;
    private String displayDate;
    private String time;
    private String venue;
    private String seat;
    private String status;
    private String type;
}
