# AI-Based Smart Campus Assistant — Backend Service

A **Spring Boot 3 + Java** REST API backend powering the **AI-Based Smart Campus Assistant (CampusIQ)**.

---

## 🌟 Architecture Overview

- **Framework**: Spring Boot 3.2.4 (Java 17 / Java 21)
- **Database**:
  - In-memory H2 database enabled by default for zero-friction setup.
  - Pre-configured for MySQL 8.0 production workloads (`application.properties`).
- **Security**: Spring Security with CORS filter enabled for React frontend (`localhost:5173`).
- **ORM**: Spring Data JPA / Hibernate with automatic entity DDL updates and pre-seeded mock records.

---

## 📡 REST API Endpoints

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Student & Faculty JWT login validation |
| `GET` | `/api/timetable` | Class schedule filtered by day or semester |
| `GET` | `/api/attendance` | Subject-wise attendance calculation & 75% cutoff status |
| `GET` | `/api/examinations`| Midterm & semester ratified examination dates & seatings |
| `GET` | `/api/faculty` | Faculty directory with office cabin & consultation hours |
| `GET` | `/api/events` | Campus hackathons, guest lectures, and RSVP statuses |
| `GET` | `/api/announcements`| Campus official circulars with priority labels |
| `POST` | `/api/ai/chat` | AI knowledge reasoning endpoint with verified metadata |

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/VishalBattula07/AI-Based-Smart-Campus-Backend.git
cd AI-Based-Smart-Campus-Backend

# Run with Maven Wrapper
./mvnw spring-boot:run
```

The server starts at `http://localhost:8080/`.
H2 Web Console available at `http://localhost:8080/h2-console`.
