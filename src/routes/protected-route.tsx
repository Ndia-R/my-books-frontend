import type { RoleType } from '@/constants/roles';
import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet, useLocation } from 'react-router';

type Props = {
  permittedRoles?: RoleType[];
};

export default function ProtectedRoute({ permittedRoles }: Props) {
  const location = useLocation();
  const { isLoading, isAuthenticated, hasRole } = useAuth();

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
  if (permittedRoles) {
    const hasPermittedRole = permittedRoles.some((role) => hasRole(role));
    if (!hasPermittedRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <Outlet />;
}
