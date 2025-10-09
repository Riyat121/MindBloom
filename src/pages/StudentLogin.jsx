// src/pages/StudentLogin.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

// Assuming Firebase dependencies are correctly configured
import { auth } from '../firebase.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

// Assuming these components are defined elsewhere (Navbar, Card, Button)
import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';


export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // The login logic using Firebase Authentication
  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Client-side check for empty fields
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // Attempt to sign in with Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Success: Set local flag and navigate
        localStorage.setItem('mindease_student_auth', 'true');
        navigate('/student/quiz');
      })
      .catch((err) => {
        // Failure: Display Firebase error message
        console.error("Firebase Login Error:", err.code);
        
        let friendlyError;
        // Map common Firebase errors to user-friendly messages
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            friendlyError = 'Invalid email or password.';
            break;
          case 'auth/invalid-email':
            friendlyError = 'Please enter a valid email address.';
            break;
          default:
            friendlyError = 'Login failed. Please check your credentials and try again.';
        }
        setError(friendlyError);
      });
  }

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 8 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }} 
          className="w-full max-w-md"
        >
          {/* Card component provides the visual container/card styling */}
          <Card className="w-full max-w-md p-8 shadow-lg">
            
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
              Student Login
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com"
                  // Tailwind CSS classes for consistent styling
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  required
                />
              </div>

              {/* Password Input Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  // Tailwind CSS classes for consistent styling
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  required
                />
              </div>

              {/* Error Display */}
              {error && (
                <p className="text-sm font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
              
              {/* Login Button */}
              <Button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-150">
                Login
              </Button>
            </form>
            
            {/* Sign-up Link */}
            <p className="text-sm text-slate-600 mt-6 text-center">
              Don’t have an account? <Link to="/student/signup" className="text-indigo-600 hover:underline font-medium">Sign up</Link>
            </p>

          </Card>
        </motion.div>
      </main>
    </div>
  );
}