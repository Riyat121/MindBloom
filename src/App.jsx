import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import StudentSignup from './pages/StudentSignup.jsx';
import StudentQuiz from './pages/StudentQuiz.jsx';
import RoleSelect from "./pages/RoleSelect.jsx";


const Home = () => <h1>Welcome to MindBloom!</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student/quiz" element={<StudentQuiz />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
