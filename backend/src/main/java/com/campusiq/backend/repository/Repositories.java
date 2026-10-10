package com.campusiq.backend.repository;

import com.campusiq.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public interface Repositories {

    @Repository
    interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmail(String email);
        Boolean existsByEmail(String email);
    }

    @Repository
    interface TimetableRepository extends JpaRepository<Timetable, Long> {
        List<Timetable> findByDayIgnoreCase(String day);
    }

    @Repository
    interface ExaminationRepository extends JpaRepository<Examination, Long> {}

    @Repository
    interface CampusEventRepository extends JpaRepository<CampusEvent, Long> {}

    @Repository
    interface AnnouncementRepository extends JpaRepository<Announcement, Long> {}

    @Repository
    interface FacultyRepository extends JpaRepository<Faculty, Long> {
        List<Faculty> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(String name, String department);
    }
}
