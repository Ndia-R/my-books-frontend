import { customFetch } from '@/lib/api/fetch-client';
import type { UserProfile } from '@/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Page() {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await customFetch<UserProfile>('/me/profile');
        console.log('認証成功:', res.data);

        // メインページへ遷移
        navigate('/');
      } catch (e) {
        console.error('Error fetching profile:', e);
      }
    };

    initializeAuth();
  }, [navigate]);

  return <div></div>;
}
