// src/pages/StudentSignup.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase.js'; // Assuming correct Firebase initialization
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Assuming these components are defined elsewhere and styled with Tailwind
import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';


export default function StudentSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // --- 1. Client-Side Validation ---
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // --- 2. Firebase Registration ---
    try {
      // Create user with email and password in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Store extra profile info in Firestore
      await setDoc(doc(db, 'users', user.uid), { 
          name, 
          email, 
          createdAt: new Date().toISOString() 
      });

      // Update the user's display name in Firebase Auth profile
      try { 
          await updateProfile(user, { displayName: name }); 
      } catch (e) {
          console.warn("Could not set display name:", e);
      }
      
      // Success: Redirect to the login page
      navigate('/student/login'); 

    } catch (err) {
      // Handle Firebase errors (e.g., email-already-in-use, weak-password)
      let friendlyError = err.message || 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
          friendlyError = 'This email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
          friendlyError = 'Password must be at least 6 characters long.';
      }
      setError(friendlyError);
    }
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
          <Card className="w-full max-w-md p-8 shadow-lg">
            
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Create Student Account
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  placeholder="Your name" 
                  required
                />
              </div>
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  placeholder="you@example.com" 
                  required
                />
              </div>
              
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  placeholder="••••••••" 
                  required
                />
              </div>
              
              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150" 
                  placeholder="••••••••" 
                  required
                />
              </div>
              
              {/* Error Display */}
              {error && (
                <p className="text-sm font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
              
              {/* Submit Button */}
              <Button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-150">
                Create Account
              </Button>
            </form>
            
            {/* Login Link */}
            <p className="text-sm text-slate-600 mt-6 text-center">
              Already have an account? <Link to="/student/login" className="text-indigo-600 hover:underline font-medium">Log in</Link>
            </p>

          </Card>
        </motion.div>
      </main>
    </div>
  );
}