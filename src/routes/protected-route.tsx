import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    // ログイン後に戻るべきURL（クエリパラメータ含む）をstateで渡す
    return (
      <Navigate
        to="/login"
        state={{ redirectTo: location.pathname + location.search }}
        replace
      />
    );
  }

  return <Outlet />;
}
