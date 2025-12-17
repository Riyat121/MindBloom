// src/pages/AdminDashboard.jsx

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import shadcn/ui components
import { Navigation as Navbar } from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // This auth check logic is good and doesn't need to change
  useEffect(() => {
    const authed = localStorage.getItem('mindease_admin_auth');
    if (authed !== 'true') {
      console.log('Not authorized, redirecting...');
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-full flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Welcome Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics and insights will appear here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}