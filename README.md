# AI-Based Smart Campus Assistant (CampusIQ) — Full Stack Repository

A complete, production-ready full-stack university portal combining a **Spring Boot REST API backend** with an **autonomous AI-powered React frontend**.

---

## 📁 Unified Repository Structure

```
smart-campus/
├── backend/                       # Spring Boot 3 + Java 17 REST API Service
│   ├── src/main/java/             # Controllers, JPA Models, Repositories, Security
│   ├── src/main/resources/        # application.properties (H2 & MySQL configs)
│   └── pom.xml                    # Maven dependency management
│
├── src/                           # React 19 Frontend Application
│   ├── components/                # Navbar, Sidebar, Multi-Theme Switcher
│   ├── context/                   # AuthContext, ThemeContext
│   ├── pages/                     # Dashboard, AI Copilot, Timetable, Attendance...
│   ├── services/                  # api.js (Axios), campusService.js
│   └── index.css                  # Modern Design System Tokens
│
├── public/                        # Static assets & SVG icons
├── package.json                   # Vite & React dependencies
├── vercel.json                    # Single Page App routing configuration
└── README.md
```

---

## ✨ Features

- **Autonomous AI Copilot**:
  - Timetable, venue, and faculty consultation queries in natural language.
  - Multi-source academic verification badges (`Academic ERP`, `Student Information System`).
  - Contextual quick-prompts and collapsible conversation history.
- **Student Dashboard**:
  - Personalized greetings, live academic session tags, and quick-action cards.
  - 4 KPI metric cards: Today's Classes, Attendance Overview with progress bars, Ratified Exams, and Hackathons.
  - Real-time lecture timeline with room allocations and faculty details.
- **Dynamic Multi-Theme System**:
  - **Indigo SaaS**: Clean, modern enterprise university portal.
  - **Cyber Dark Obsidian**: High-contrast, sleek cyberpunk dark mode for low-light environments.
  - **Emerald Ivy League**: Prestigious university aesthetic with rich forest tones.
- **Spring Boot 3 REST Backend**:
  - REST controllers for Timetables, Attendance, Exams, Faculty, Announcements, and AI chat.
  - Spring Data JPA with zero-config in-memory H2 database & MySQL support.

---

## 🚀 Running the Full Project

### 1. Start Frontend (React + Vite)
```bash
# In the root directory:
npm install
npm run dev
```
Runs at: **http://localhost:5173/**

### 2. Start Backend (Spring Boot 3)
```bash
# In the backend directory:
cd backend
mvn spring-boot:run
```
Runs at: **http://localhost:8080/api**  
H2 Database Console: **http://localhost:8080/h2-console**

---

## 🔒 Security & Privacy

- All sensitive credentials, build outputs (`dist/`, `target/`), and dependencies (`node_modules/`) are safely excluded by `.gitignore`.
