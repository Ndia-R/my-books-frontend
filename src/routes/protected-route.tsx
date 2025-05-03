import { getAccessToken } from '@/lib/api/fetch-api/auth-token';
import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet, useLocation } from 'react-router';
import { toast } from 'sonner';

export default function ProtectedRoute() {
  const location = useLocation();
  const accessToken = getAccessToken();
  const { isLoading, logout } = useAuth();

  console.log('befor loading');

  if (isLoading) return null;

  console.log(accessToken);

  if (!accessToken) {
    logout();
    toast.error('セッションが切れました。再度ログインしてください。', {
      duration: 5000,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
