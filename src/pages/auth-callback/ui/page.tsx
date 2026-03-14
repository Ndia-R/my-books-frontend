import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

/**
 * リダイレクトURLが安全かどうかを検証
 * 相対URLのみを許可し、外部ドメインへのリダイレクトを防止
 */
const isValidRedirectUrl = (url: string | null): boolean => {
  if (!url) return false;

  // 相対URLのみ許可（/ で始まり、// で始まらない）
  return url.startsWith('/') && !url.startsWith('//');
};

export default function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // BFFから渡されたreturn_toパラメータから復帰先URLを取得
    const redirectTo = searchParams.get('return_to');

    // オープンリダイレクト対策: 相対URLのみ許可
    const safeRedirect =
      redirectTo && isValidRedirectUrl(redirectTo) ? redirectTo : '/';

    // 復帰先に遷移
    navigate(safeRedirect, { replace: true });
  }, [navigate, searchParams]);

  return <div></div>;
}
