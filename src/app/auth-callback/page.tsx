import { useAuth } from '@/providers/auth-provider';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // BFFから渡されたreturn_toパラメータから復帰先URLを取得
        const redirectTo = searchParams.get('return_to');

        // 復帰先に遷移（なければトップページ）
        navigate(redirectTo || '/', { replace: true });
      } catch (e) {
        console.error('Error during auth callback:', e);
        // エラー時はログインページに戻る
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams, checkAuthStatus]);

  return <div></div>;
}
