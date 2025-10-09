import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Button from '../components/Button.jsx'


export default function Home() {
  return (
    <div className="min-h-full flex flex-col relative overflow-hidden">
      {/* Angled background panel to mimic the reference */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-32 h-[140%] w-[72%] rotate-[18deg] bg-white/70" />
      </div>
      <Navbar />
      <main className="flex-1 flex items-center justify-center  px-4">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Title and actions */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="mb-6 hidden sm:block">
              <div className="h-px w-40 bg-slate-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Understanding
              <br />
              Mental Health
            </h1>
            <p className="mt-6 text-lg text-slate-600">Breaking the silence, building resilience.</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <Link to="/student/login" className="w-full">
                <Button className="w-full py-3 md:py-4 text-base md:text-lg">Student</Button>
              </Link>
              <Link to="/admin/login" className="w-full">
                <Button variant="secondary" className="w-full py-3 md:py-4 text-base md:text-lg border border-slate-300">Admin</Button>
              </Link>
            </div>
          </motion.section>

          {/* Right: Abstract illustration placeholder */}
       <div className='flex justify-end'>
       <img className='right-100' src="https://plus.unsplash.com/premium_vector-1682306562484-b89388ec4304?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8" alt="" />
       </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">© 2025 MindBloom. All Rights Reserved.</footer>
    </div>
  )
}


