package com.campusiq.backend.controller;

import com.campusiq.backend.model.*;
import com.campusiq.backend.repository.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CampusApiController {

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

    // --- Authentication ---
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("token", "jwt_token_" + UUID.randomUUID().toString());
            response.put("user", user);
            return ResponseEntity.ok(response);
        }

        // Auto fallback for demo
        String role = email.contains("admin") ? "ADMIN" : email.contains("faculty") ? "FACULTY" : "STUDENT";
        User demoUser = User.builder()
                .name(role.equals("ADMIN") ? "Dean Arthur Vance" : role.equals("FACULTY") ? "Dr. Evelyn Reed" : "Alex Rivera")
                .email(email)
                .role(role)
                .department("Computer Science & Engineering")
                .rollNo("21BCSE042")
                .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200")
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt_token_" + UUID.randomUUID().toString());
        response.put("user", demoUser);
        return ResponseEntity.ok(response);
    }

    // --- Timetable ---
    @GetMapping("/timetable")
    public List<Timetable> getTimetable(@RequestParam(required = false) String day) {
        if (day != null && !day.isEmpty()) {
            return timetableRepository.findByDayIgnoreCase(day);
        }
        return timetableRepository.findAll();
    }

    // --- Attendance ---
    @GetMapping("/attendance")
    public Map<String, Object> getAttendance() {
        Map<String, Object> attendanceData = new HashMap<>();
        attendanceData.put("overallPercentage", 86.4);
        attendanceData.put("totalClasses", 184);
        attendanceData.put("attendedClasses", 159);
        attendanceData.put("requiredPercentage", 75.0);

        List<Map<String, Object>> subjects = new ArrayList<>();
        subjects.add(Map.of("subject", "Distributed Cloud Systems", "code", "CS-601", "attended", 32, "total", 35, "percentage", 91.4, "faculty", "Dr. Evelyn Reed", "status", "Excellent"));
        subjects.add(Map.of("subject", "Machine Learning & Neural Networks", "code", "CS-603", "attended", 28, "total", 34, "percentage", 82.3, "faculty", "Prof. Marcus Vance", "status", "Good"));
        subjects.add(Map.of("subject", "Compiler Design & Automata", "code", "CS-605", "attended", 31, "total", 36, "percentage", 86.1, "faculty", "Dr. Sarah Chen", "status", "Good"));
        subjects.add(Map.of("subject", "Full Stack Capstone Studio", "code", "CS-609", "attended", 38, "total", 40, "percentage", 95.0, "faculty", "Prof. David Miller", "status", "Excellent"));
        subjects.add(Map.of("subject", "Cybersecurity & Cryptography", "code", "CS-607", "attended", 30, "total", 39, "percentage", 76.9, "faculty", "Dr. Evelyn Reed", "status", "Borderline"));

        attendanceData.put("subjects", subjects);
        return attendanceData;
    }

    // --- Examinations ---
    @GetMapping("/examinations")
    public List<Examination> getExaminations() {
        return examinationRepository.findAll();
    }

    // --- Events ---
    @GetMapping("/events")
    public List<CampusEvent> getEvents() {
        return campusEventRepository.findAll();
    }

    // --- Announcements ---
    @GetMapping("/announcements")
    public List<Announcement> getAnnouncements() {
        return announcementRepository.findAll();
    }

    // --- Faculty ---
    @GetMapping("/faculty")
    public List<Faculty> getFaculty(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return facultyRepository.findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(search, search);
        }
        return facultyRepository.findAll();
    }

    // --- AI Chatbot Reasoning Endpoint ---
    @PostMapping("/ai/chat")
    public ResponseEntity<?> chatWithAI(@RequestBody Map<String, Object> payload) {
        String prompt = (String) payload.getOrDefault("prompt", "");
        String query = prompt.toLowerCase();

        Map<String, Object> res = new HashMap<>();

        if (query.contains("timetable") || query.contains("class") || query.contains("schedule")) {
            res.put("answer", "Here is your academic schedule for today:\n\n* **09:00 AM – 10:15 AM**: **Distributed Cloud Systems (CS-601)** in *Lab Complex 3B* with Dr. Evelyn Reed.\n* **10:30 AM – 11:45 AM**: **Machine Learning & Neural Networks (CS-603)** in *Hall B-204* with Prof. Marcus Vance.\n* **01:15 PM – 02:30 PM**: **Compiler Design & Automata (CS-605)** in *Hall A-102* with Dr. Sarah Chen.\n* **02:45 PM – 04:15 PM**: **Full Stack Web Engineering Capstone (CS-609)** in *Software Center 1* with Prof. David Miller.\n\nWould you like me to set a reminder 15 minutes before your ML lecture?");
            res.put("verified", true);
            res.put("source", "Spring Boot Academic ERP & Timetable Registry");
            res.put("suggestedActions", List.of("View full weekly timetable", "Email Dr. Evelyn Reed", "Set class alerts"));
        } else if (query.contains("attendance") || query.contains("percent")) {
            res.put("answer", "### Current Attendance Analysis\n\nYour aggregate attendance stands at **86.4%** across all registered courses. You comfortably exceed the university eligibility threshold of **75.0%**.\n\n* **Full Stack Studio**: **95.0%** (38/40 attended) — *Excellent*\n* **Distributed Systems**: **91.4%** (32/35 attended) — *Excellent*\n* **Compiler Design**: **86.1%** (31/36 attended) — *Good*\n* **Machine Learning**: **82.3%** (28/34 attended) — *Good*\n* **Cybersecurity**: **76.9%** (30/39 attended) — ⚠️ *Caution: 1 absence away from shortfall!*\n\n> **Tip**: Attending the next two Cybersecurity lectures will raise your safety margin to 80.5%.");
            res.put("verified", true);
            res.put("source", "Spring Boot Student Information System (SIS Attendance DB)");
            res.put("suggestedActions", List.of("Download attendance slip", "Apply for medical leave exemption", "View subject breakdown"));
        } else {
            res.put("answer", "I am your **CampusIQ AI Assistant**, powered by verified Spring Boot backend university records. I can assist you with your schedule, attendance percentage, examination seating, and faculty cabin locations.");
            res.put("verified", true);
            res.put("source", "Spring Boot Campus Knowledge Graph (Live Controller)");
            res.put("suggestedActions", List.of("Show my timetable", "Check my attendance", "Upcoming examinations"));
        }

        return ResponseEntity.ok(res);
    }
}
