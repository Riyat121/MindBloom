// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-100 text-gray-800 flex flex-col">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-cyan-700">MoodSpark</h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <button onClick={() => navigate("/student/login")} className="hover:text-cyan-700 transition">
            Student Login
          </button>
          <button onClick={() => navigate("/admin/login")} className="hover:text-cyan-700 transition">
            Admin Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
          Track Your Moods. Understand Yourself.
        </h2>
        <p className="text-gray-600 max-w-2xl mb-8">
          MoodSpark helps you monitor your emotional patterns and mental
          well-being effortlessly. Start your journey toward better
          self-awareness and mental balance today.
        </p>
        <button
          onClick={() => navigate("/role-select")}
          className="px-8 py-4 text-lg font-semibold bg-cyan-600 text-white rounded-xl shadow-md hover:bg-cyan-700 transition"
        >
          Start Tracking
        </button>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} MoodSpark. All rights reserved.
      </footer>
    </main>
  );
}
