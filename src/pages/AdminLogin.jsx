import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Login button clicked 🚀");
    e.preventDefault();
    setError('');

    try {
      const snapshot = await getDocs(collection(db, "adminKeys"));
      const validKeys = snapshot.docs.map(doc => doc.data().key);

      if (validKeys.includes(key.trim())) {
        localStorage.setItem('mindease_admin_auth', 'true');
        setTimeout(() => navigate("/admin/dashboard", { replace: true }), 300);
      } else {
        setError("Invalid Admin Access Key.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during verification. Please try again.");
    }
  };

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
              Admin Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="admin-key" className="block text-sm font-medium text-slate-700 mb-2">
                  Access Key
                </label>
                <input
                  id="admin-key"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-150"
              >
                Login
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
