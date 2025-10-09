import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { auth, db } from '../firebase.js'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const COLORS = ['#6D28D9', '#E6E9F8']

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authed = localStorage.getItem('mindease_student_auth') === 'true'
    if (!authed) {
      navigate('/student/login', { replace: true })
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return unsub
  }, [navigate])

  useEffect(() => {
    async function fetchLast() {
      // First try localStorage fallback
      const local = localStorage.getItem('mindease_last_result')
      if (local) {
        try { setResult(JSON.parse(local)); return } catch(e){}
      }
      if (!user) return
      try {
        const resultsCol = collection(db, 'results')
        const q = query(resultsCol, where('uid', '==', user.uid), orderBy('createdAt', 'desc'), limit(1))
        const snap = await getDocs(q)
        if (!snap.empty) {
          const d = snap.docs[0].data()
          setResult({ score: d.score, max: d.max || d.score, label: d.label || d.label, tips: d.tips || [], date: d.createdAt && d.createdAt.toDate ? d.createdAt.toDate().toISOString() : null })
        }
      } catch (e) {
        console.warn('fetch last result', e)
      }
    }
    fetchLast()
  }, [user])

  function handleRetake() {
    navigate('/student/quiz')
  }

  function handleLogout() {
    localStorage.removeItem('mindease_student_auth')
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <Card className="text-center">
            <h2 className="text-3xl font-semibold mb-3">Your Mental Health Snapshot</h2>
            {!result && (
              <div>
                <p className="text-slate-600">You haven't completed the assessment yet.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <Button onClick={() => navigate('/student/quiz')} className="w-full">Take Assessment</Button>
                  <Button variant="secondary" onClick={handleLogout} className="w-full">Logout</Button>
                </div>
              </div>
            )}
            {result && (
              <div>
                <div style={{ height: 220, marginBottom: 8 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ name: 'Score', value: result.score }, { name: 'Remaining', value: result.max - result.score }]} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={2}>
                        <Cell key="score" fill={COLORS[0]} />
                        <Cell key="rest" fill={COLORS[1]} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-slate-700 text-lg mb-2">Score: <strong>{result.score}</strong> / {result.max}</p>
                <p className="text-slate-600 mb-4">Interpretation: <strong>{result.label}</strong></p>
                <div className="text-left space-y-2 mb-4">
                  {result.tips && result.tips.map((t,i) => <p key={i} className="text-sm text-slate-700">• {t}</p>)}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button onClick={handleRetake} className="w-full">Retake Assessment</Button>
                  <Button variant="secondary" onClick={handleLogout} className="w-full">Logout</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
