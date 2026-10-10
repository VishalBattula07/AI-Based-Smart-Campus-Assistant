import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AIAssistant from './pages/AIAssistant';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import Examinations from './pages/Examinations';
import FacultyDirectory from './pages/FacultyDirectory';
import Departments from './pages/Departments';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import CampusFacilities from './pages/CampusFacilities';
import ChatHistory from './pages/ChatHistory';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If unauthorized, redirect to standard dashboard
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Main Authenticated Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="assistant" element={<AIAssistant />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="examinations" element={<Examinations />} />
        <Route path="faculty" element={<FacultyDirectory />} />
        <Route path="departments" element={<Departments />} />
        <Route path="events" element={<Events />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="facilities" element={<CampusFacilities />} />
        <Route path="chat-history" element={<ChatHistory />} />
        <Route path="settings" element={<Settings />} />

        {/* Specialized Portals */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="faculty-portal" element={<FacultyDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
