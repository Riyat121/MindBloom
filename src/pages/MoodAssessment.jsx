
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import QuizQuestion from '../components/QuizQuestion.jsx'
import { auth, db } from '../firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const QUESTIONS = [
  { q: 'How often do you feel anxious?', w: 1 },
  { q: 'How well did you sleep last night?', w: 1 },
  { q: 'How often do you feel overwhelmed by tasks?', w: 1 },
  { q: 'How supported do you feel by friends/family?', w: 1 },
  { q: 'How often do you experience tension headaches or body stress?', w: 1 },
  { q: 'How satisfied are you with your current routine?', w: 1 },
  { q: 'How often do you have trouble concentrating?', w: 1 },
  { q: 'How frequently do you feel low energy or fatigue?', w: 1 },
  { q: 'How often do you feel irritable or angry?', w: 1 },
  { q: 'How often do you feel able to enjoy hobbies?', w: 1 },
  { q: 'How often do you avoid social situations?', w: 1 },
  { q: 'How often do you feel overwhelmed by negative thoughts?', w: 1 }
]

const OPTIONS = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Almost always', value: 3 },
]

export default function MoodAssessment() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return unsub
  }, [])

  useEffect(() => {
    const authed = localStorage.getItem('mindease_student_auth') === 'true'
    if (!authed) navigate('/student/login', { replace: true })
  }, [navigate])

  function handleChange(index, value) {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  async function handleSubmit() {
    if (answers.some((a) => a === null)) return
    setSubmitted(true)

    // compute score
    const total = answers.reduce((s, v, i) => {
      const w = QUESTIONS[i].w || 1
      return s + (Number(v) || 0) * w
    }, 0)
    const max = QUESTIONS.reduce((s, q) => s + (q.w || 1) * 3, 0)
    const pct = total / max
    let label = 'Low'
    if (pct >= 0.66) label = 'High'
    else if (pct >= 0.33) label = 'Moderate'
    // tips
    const tips = []
    if (label === 'Low') {
      tips.push('Maintain your routine and keep up healthy sleep and exercise.')
    } else if (label === 'Moderate') {
      tips.push('Try short daily mindfulness (5–10 minutes) and review your workload.')
      tips.push('Talk to a friend or family member about how you feel.')
    } else {
      tips.push('Consider reaching out to a mental health professional.')
      tips.push('If you feel overwhelmed, try breathing exercises and reduce immediate stressors.')
    }

    const result = { score: total, max, label, tips, date: new Date().toISOString() }

    // save locally for compatibility
    try {
      localStorage.setItem('mindease_last_result', JSON.stringify(result))
    } catch (e) {
      console.warn('Could not save result', e)
    }

    // also save to Firestore if user is signed in
    try {
      const resultsCol = collection(db, 'results')
      await addDoc(resultsCol, {
        uid: user ? user.uid : null,
        email: user ? user.email : null,
        score: total,
        max,
        label,
        tips,
        createdAt: serverTimestamp()
      })
    } catch (e) {
      console.warn('Could not save to Firestore', e)
    }

    // navigate to dashboard to show results
    navigate('/student/dashboard')
  }

  function handleLogout() {
    localStorage.removeItem('mindease_student_auth')
    navigate('/student/login')
  }

  function handleRetake() {
    setAnswers(Array(QUESTIONS.length).fill(null))
    setSubmitted(false)
  }

  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-2xl">
        <Card className="w-full max-w-2xl">
          {!submitted ? (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2 text-center">How are you feeling today?</h2>
              <p className="text-slate-600 mb-6 text-center">Please answer all questions to get your stress level</p>
              {QUESTIONS.map((q, i) => (
                <QuizQuestion key={i} index={i} question={q.q} options={OPTIONS} value={answers[i]} onChange={(v) => handleChange(i, v)} />
              ))}
              <Button onClick={handleSubmit} className="w-full" disabled={answers.some((a) => a === null)}>Submit</Button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your current stress level is { /* placeholder */ '...'}</h2>
              <p className="text-slate-700 mb-6">
                Based on your answers we calculated a result. You can view the full result on your dashboard.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button onClick={handleRetake} className="w-full">Retake Quiz</Button>
                <Button onClick={handleLogout} variant="secondary" className="w-full">Logout</Button>
              </div>
            </div>
          )}
        </Card>
        </motion.div>
      </main>
    </div>
  )
}
