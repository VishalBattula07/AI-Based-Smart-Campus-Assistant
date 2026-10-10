import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  GraduationCap,
  Calendar,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('STUDENTS'); // 'STUDENTS' | 'ANNOUNCEMENTS' | 'EVENTS'
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Rivera', rollNo: '21BCSE042', dept: 'CSE', attendance: '86.4%', status: 'Active' },
    { id: 2, name: 'Maya Patel', rollNo: '21BCSE088', dept: 'CSE', attendance: '92.1%', status: 'Active' },
    { id: 3, name: 'Liam Johnson', rollNo: '21BAID014', dept: 'AIDS', attendance: '78.5%', status: 'Active' },
    { id: 4, name: 'Sofia Rodriguez', rollNo: '21BECE031', dept: 'ECE', attendance: '71.2%', status: 'Warning' },
    { id: 5, name: 'Ethan Zhao', rollNo: '21BCSE105', dept: 'CSE', attendance: '94.8%', status: 'Active' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newDept, setNewDept] = useState('CSE');

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName || !newRollNo) return;
    const newEntry = {
      id: Date.now(),
      name: newStudentName,
      rollNo: newRollNo,
      dept: newDept,
      attendance: '100.0%',
      status: 'Active',
    };
    setStudents([newEntry, ...students]);
    setNewStudentName('');
    setNewRollNo('');
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">University Administration Portal</h1>
          <p className="page-subtitle">Manage enrolled students, academic faculty records, timetable rosters, and circulars</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Add New Record</span>
        </button>
      </div>

      {/* High-level system statistics */}
      <div className="admin-stats-grid">
        <div className="campus-card a-stat-card">
          <span className="a-stat-label">Total Registered Students</span>
          <span className="a-stat-num">2,430</span>
          <span className="a-stat-sub text-success">+14% intake Fall 2026</span>
        </div>
        <div className="campus-card a-stat-card">
          <span className="a-stat-label">Active Faculty Members</span>
          <span className="a-stat-num">116</span>
          <span className="a-stat-sub">Across 4 Engineering Depts</span>
        </div>
        <div className="campus-card a-stat-card">
          <span className="a-stat-label">AI Copilot Inquiries</span>
          <span className="a-stat-num">18,940</span>
          <span className="a-stat-sub text-violet">99.4% Verified Accuracy</span>
        </div>
        <div className="campus-card a-stat-card">
          <span className="a-stat-label">Scheduled Exam Venues</span>
          <span className="a-stat-num">32 Halls</span>
          <span className="a-stat-sub">Midterm seating complete</span>
        </div>
      </div>

      {/* Management Tabs */}
      <div className="campus-card admin-content-box">
        <div className="admin-box-header">
          <div className="btn-group-toggle">
            <button
              className={`toggle-option ${activeTab === 'STUDENTS' ? 'active' : ''}`}
              onClick={() => setActiveTab('STUDENTS')}
            >
              Enrolled Students ({students.length})
            </button>
            <button
              className={`toggle-option ${activeTab === 'ANNOUNCEMENTS' ? 'active' : ''}`}
              onClick={() => setActiveTab('ANNOUNCEMENTS')}
            >
              Broadcast Circulars
            </button>
          </div>
        </div>

        {activeTab === 'STUDENTS' && (
          <div className="table-container">
            <table className="campus-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Department</th>
                  <th>Attendance</th>
                  <th>Academic Standing</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((std) => (
                  <tr key={std.id}>
                    <td><strong>{std.name}</strong></td>
                    <td><code>{std.rollNo}</code></td>
                    <td><span className="badge badge-indigo">{std.dept}</span></td>
                    <td>{std.attendance}</td>
                    <td>
                      <span className={`badge ${std.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {std.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm text-danger"
                        onClick={() => handleDeleteStudent(std.id)}
                        title="Delete student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'ANNOUNCEMENTS' && (
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
              Broadcast urgent circulars directly to student dashboards and mobile push notifications.
            </p>
            <button
              className="btn btn-accent"
              onClick={() => alert('New announcement wizard opened.')}
            >
              <Plus size={16} />
              <span>Draft New Campus Circular</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="section-title">Add Student Record</h2>
              <p className="section-subtitle">Register student to Fall 2026 semester roster</p>
            </div>
            <form onSubmit={handleAddStudent} style={{ margin: '20px 0' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  className="form-input"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">University Roll Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 21BCSE120"
                  className="form-input"
                  value={newRollNo}
                  onChange={(e) => setNewRollNo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  className="form-input"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                >
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="AIDS">AI & Data Science</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="MECH">Mechanical Engineering</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 960px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .a-stat-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .a-stat-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .a-stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-text-main);
          letter-spacing: -0.02em;
        }
        .a-stat-sub {
          font-size: 0.74rem;
          color: var(--color-text-muted);
        }
        .admin-content-box {
          padding: 20px;
        }
        .admin-box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
