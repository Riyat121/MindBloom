import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import StudentLogin from './pages/StudentLogin.jsx'
import StudentSignup from './pages/StudentSignup.jsx'
import MoodAssessment from './pages/MoodAssessment.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/student/login', element: <StudentLogin /> },
  { path: '/student/signup', element: <StudentSignup /> },
  { path: '/student/quiz', element: <MoodAssessment /> },
  { path: '/student/dashboard', element: <StudentDashboard /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
