import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#g1)" opacity="0.15" />
        <path d="M24 10c6 0 11 5 11 11 0 7-7 12-11 17-4-5-11-10-11-17 0-6 5-11 11-11Z" fill="url(#g1)"/>
      </svg>
      <span className="text-lg sm:text-xl font-semibold text-slate-800">MindBloom</span>
    </div>
  )
}

export default function Navbar() {
  return (
    <header className="w-full py-4">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/student/login" className="px-4 py-2 rounded-md text-slate-700 hover:bg-indigo-100 transition">
            Student
          </Link>
         <Link to="/admin/login" className="px-4 py-2 rounded-md text-slate-700 hover:bg-indigo-100 transition">
            Admin
        </Link>


        </div>
      </nav>
    </header>
  )
}


