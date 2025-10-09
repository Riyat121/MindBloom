export default function QuizQuestion({ index, question, options, value, onChange }) {
  return (
    <div className="mb-6">
      <p className="font-medium text-slate-800 mb-3">{index + 1}. {question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <label key={opt.value} className={`cursor-pointer rounded-xl border p-3 text-sm transition-colors ${value === opt.value ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}>
            <input
              type="radio"
              name={`q-${index}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="mr-2"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}


