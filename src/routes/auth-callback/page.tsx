import { httpFetch } from '@/lib/api/fetch';
import type { UserProfile } from '@/types';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await httpFetch<UserProfile>('/me/profile');
        console.log('認証成功:', res.data);

        // BFFから渡されたreturn_toパラメータから復帰先URLを取得
        const redirectTo = searchParams.get('return_to');

        console.log('復帰先URL:', redirectTo);

        // 復帰先に遷移（なければトップページ）
        navigate(redirectTo || '/');
      } catch (e) {
        console.error('Error fetching profile:', e);
      }
    };

    initializeAuth();
  }, [navigate, searchParams]);

  return <div></div>;
}
