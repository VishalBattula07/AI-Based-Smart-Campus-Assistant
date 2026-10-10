package com.campusiq.backend.service;

import com.campusiq.backend.model.*;
import com.campusiq.backend.repository.Repositories.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CampusDataInitService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TimetableRepository timetableRepository;

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private CampusEventRepository campusEventRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @PostConstruct
    public void seedInitialData() {
        if (userRepository.count() > 0) return;

        // Seed Users
        userRepository.save(User.builder()
                .name("Alex Rivera")
                .email("alex.rivera@campus.edu")
                .password("password123")
                .role("STUDENT")
                .department("Computer Science & Engineering")
                .rollNo("21BCSE042")
                .semester("6th Semester")
                .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200")
                .build());

        userRepository.save(User.builder()
                .name("Dr. Evelyn Reed")
                .email("evelyn.reed@campus.edu")
                .password("secret2026")
                .role("FACULTY")
                .department("Computer Science & Engineering")
                .rollNo("FAC-102")
                .semester("Faculty")
                .avatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200")
                .build());

        userRepository.save(User.builder()
                .name("Dean Arthur Vance")
                .email("admin.vance@campus.edu")
                .password("secret2026")
                .role("ADMIN")
                .department("Administration & Academic Affairs")
                .rollNo("ADM-001")
                .semester("Dean Office")
                .avatar("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200")
                .build());

        // Seed Timetables
        timetableRepository.save(new Timetable(null, "09:00 AM - 10:15 AM", "Distributed Cloud Systems", "CS-601", "Lab Complex 3B", "Dr. Evelyn Reed", "Monday", "Upcoming", "Lecture & Lab"));
        timetableRepository.save(new Timetable(null, "10:30 AM - 11:45 AM", "Machine Learning & Neural Networks", "CS-603", "Hall B-204", "Prof. Marcus Vance", "Monday", "Upcoming", "Lecture"));
        timetableRepository.save(new Timetable(null, "01:15 PM - 02:30 PM", "Compiler Design & Automata", "CS-605", "Hall A-102", "Dr. Sarah Chen", "Monday", "Upcoming", "Lecture"));
        timetableRepository.save(new Timetable(null, "02:45 PM - 04:15 PM", "Full Stack Web Engineering Capstone", "CS-609", "Software Center 1", "Prof. David Miller", "Monday", "Upcoming", "Studio Lab"));

        // Seed Examinations
        examinationRepository.save(new Examination(null, "Distributed Cloud Systems Midterm", "CS-601", "2026-10-24", "Oct 24, 2026", "10:00 AM - 12:30 PM", "Auditorium Hall B", "B-42", "Confirmed", "Theory Written"));
        examinationRepository.save(new Examination(null, "Machine Learning Practical Viva", "CS-603", "2026-10-28", "Oct 28, 2026", "01:30 PM - 04:30 PM", "Computing Lab 4", "PC-18", "Scheduled", "Laboratory Viva"));
        examinationRepository.save(new Examination(null, "Compiler Design Midterm", "CS-605", "2026-11-04", "Nov 04, 2026", "09:30 AM - 12:00 PM", "Examination Block 102", "A-19", "Scheduled", "Theory Written"));

        // Seed Events
        campusEventRepository.save(new CampusEvent(null, "Technovate 2026: Annual AI & Robotics Hackathon", "Hackathon", "2026-10-18", "Oct 18 - 20, 2026", "48 Hours Live", "Main Campus Innovation Hub", "Premier inter-university hackathon featuring $15,000 in bounties, industry mentors from Google & NVIDIA, and angel networking.", true, "400 Students", "indigo"));
        campusEventRepository.save(new CampusEvent(null, "Keynote: Architecting Scalable AI Microservices", "Guest Lecture", "2026-10-22", "Oct 22, 2026", "04:00 PM - 06:00 PM", "Turing Auditorium & Zoom Live", "Distinguished lecture by Principal ML Architect from OpenAI discussing inference optimization and autonomous workflow routing.", false, "250 Seats", "violet"));

        // Seed Announcements
        announcementRepository.save(new Announcement(null, "Mid-Semester Examination Schedule & Seating Allotment Released", "HIGH", "Academic", "Today, 11:20 AM", "Office of the Dean of Academic Affairs", "The official schedule for the Fall 2026 Mid-Semester examinations has been ratified. Students are advised to verify venue seating slots and bring their smart ID cards."));
        announcementRepository.save(new Announcement(null, "Campus Central Library 24/7 Extended Hours for Exam Preparation", "MEDIUM", "Facilities", "Yesterday, 04:15 PM", "Head Librarian", "Beginning Monday, the central library study cubicles and digital discovery lounge will remain operational 24 hours daily with shuttle bus connectivity."));

        // Seed Faculty
        facultyRepository.save(new Faculty(null, "Dr. Evelyn Reed", "Associate Professor & Research Chair", "Computer Science & Engineering", "evelyn.reed@campus.edu", "Turing Tower, Room 412", "+1 (555) 389-1021", "Tue & Thu: 2:00 PM - 4:00 PM", "Distributed Systems, Cloud Fault-Tolerance, Raft Consensus", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"));
        facultyRepository.save(new Faculty(null, "Prof. Marcus Vance", "Professor & Head of AI Lab", "Artificial Intelligence & Data Science", "marcus.vance@campus.edu", "Von Neumann Block, Room 205", "+1 (555) 389-1044", "Mon & Wed: 11:00 AM - 1:00 PM", "Deep Reinforcement Learning, Generative Transformers, Autonomous Agents", "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200"));
    }
}
