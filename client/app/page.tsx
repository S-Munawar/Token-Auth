'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/lib/api';
import { getToken, clearToken } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchUser() {
      try {
        if (!token) throw new Error('No token');
        const data = await getMe(token);
        setUserEmail(data.user.email);
      } catch (err) {
        clearToken();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}</p>
      <button
        onClick={() => {
          clearToken();
          router.push('/login');
        }}
        style={{
          marginTop: 16,
          padding: 8,
          borderRadius: 4,
          border: '1px solid #333',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}
