// src/pages/RoleSelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-sky-100 text-gray-800">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-cyan-700">
          Choose Your Role
        </h1>
        <p className="text-gray-600 mb-8">
          Select whether you want to log in as a Student or Admin to continue.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/student/login")}
            className="px-6 py-3 rounded-xl font-semibold bg-cyan-600 text-white hover:bg-cyan-700 transition"
          >
            I’m a Student
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="px-6 py-3 rounded-xl font-semibold bg-sky-500 text-white hover:bg-sky-600 transition"
          >
            I’m an Admin
          </button>
        </div>
      </div>
    </div>
  );
}
