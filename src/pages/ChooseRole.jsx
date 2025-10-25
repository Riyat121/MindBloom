import { useNavigate } from 'react-router-dom';

export default function ChooseRole() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Continue as</h2>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/student/login')} className="py-3 px-4 bg-indigo-600 text-white rounded">Student</button>
          <button onClick={() => navigate('/admin/login')} className="py-3 px-4 border rounded">Admin</button>
        </div>
      </div>
    </div>
  );
}
