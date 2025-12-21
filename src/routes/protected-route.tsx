import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}
