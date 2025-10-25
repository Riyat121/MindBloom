import { motion } from 'framer-motion'

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-400',
    secondary: 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 focus:ring-slate-300',
    ghost: 'bg-transparent text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-200'
  }
  return (
  <motion.button
    type={props.type || "button"}  // ✅ ensure correct button type
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`${base} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
  )

}


