import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const authed = localStorage.getItem('mindease_admin_auth');
    if (authed !== 'true') {
      console.log('Not authorized, redirecting...');
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <Card className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Welcome Admin
            </h2>
            <p className="text-slate-600">
              Analytics and insights will appear here.
            </p>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
