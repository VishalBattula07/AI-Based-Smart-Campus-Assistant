# AI-Based Smart Campus Assistant (CampusIQ)

A modern, SaaS-inspired **AI-Based Smart Campus Assistant** built as a final-year B.Tech Capstone Project. The system integrates university services (timetable, attendance tracking, examination halls, faculty directories, campus circulars) with an autonomous AI copilot.

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
- **Role-Aware Portals**:
  - **Student View**: Timetable, Attendance (75% cutoff compliance), Examinations, Faculty Directory, Events, Announcements, Facilities.
  - **Faculty Workspace**: Course rosters, lecture schedules, and attendance marking.
  - **Administration Portal**: Student management table with creation/deletion dialogues and system KPI tracking.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router v7, Lucide Icons, Modern CSS Design System Tokens
- **Backend Architecture**: RESTful API service abstraction (`axios`) designed for Spring Boot / Node.js
- **Database / Entities**: Structured academic models for students, faculties, timetables, exams, and attendance

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Based-Smart-Campus-Assistant.git
   cd AI-Based-Smart-Campus-Assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Privacy

- No sensitive API keys or credentials are hardcoded into frontend client bundles.
- `.gitignore` is pre-configured to strictly ignore `.env` files, build output (`dist/`), and `node_modules/`.
