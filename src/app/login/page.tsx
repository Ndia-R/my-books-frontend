import { useAuth } from '@/providers/auth-provider';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function Page() {
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // 復帰先URLを取得
    const redirectTo = (location.state as { redirectTo?: string })?.redirectTo;

    // BFFログインにリダイレクト（復帰先URLをreturn_toパラメータとして渡す）
    login(redirectTo);
  }, [login, location.state]);

  // リダイレクト中の表示（通常はすぐにリダイレクトされるため見えない）
  return (
    <div className="flex h-[calc(100vh-64px-140px)] items-center justify-center sm:h-[calc(100vh-64px-72px)]">
      <p className="text-lg">ログインページに移動中...</p>
    </div>
  );
}
