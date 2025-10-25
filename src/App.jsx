import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import StudentSignup from './pages/StudentSignup.jsx';
import StudentQuiz from './pages/StudentQuiz.jsx';

import Home from './pages/Home.jsx';
import ChooseRole from './pages/ChooseRole.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose/role" element={<ChooseRole />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student/quiz" element={<StudentQuiz />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
