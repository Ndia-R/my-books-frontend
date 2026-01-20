import type { RoleType } from '@/constants/roles';
import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet, useLocation } from 'react-router';

type Props = {
  roles?: RoleType[];
};

export default function ProtectedRoute({ roles }: Props) {
  const location = useLocation();
  const { isLoading, isAuthenticated, hasAnyRole } = useAuth();

  if (isLoading) return null;

  // ログインしていない場合は、ログイン後に戻るべきURL（クエリパラメータ含む）を
  // stateで渡してログイン画面へ遷移
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ redirectTo: location.pathname + location.search }}
        replace
      />
    );
  }

  // ロールの指定がある場合は、画面に必要なロールを持っているかチェックする
  // ロールを持っていない場合はアクセス権限なし画面へ遷移
  if (roles) {
    if (!hasAnyRole(roles)) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <Outlet />;
}
