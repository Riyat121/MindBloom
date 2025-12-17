// src/pages/AdminLogin.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from '../firebase.js'; // Imports from your central firebase file

// Import shadcn/ui components
import { Navigation as Navbar } from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log('Login button clicked 🚀');
    e.preventDefault();
    setError('');

    try {
      const snapshot = await getDocs(collection(db, 'adminKeys'));
      const validKeys = snapshot.docs.map((doc) => doc.data().key);

      if (validKeys.includes(key.trim())) {
        localStorage.setItem('mindease_admin_auth', 'true');
        setTimeout(() => navigate('/admin/dashboard', { replace: true }), 300);
      } else {
        setError('Invalid Admin Access Key.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during verification. Please try again.');
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-key">Access Key</Label>
                  <Input
                    id="admin-key"
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}