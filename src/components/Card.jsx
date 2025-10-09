export default function Card({ children, className = '' }) {
  return (
    <div className={`w-full max-w-xl rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}


