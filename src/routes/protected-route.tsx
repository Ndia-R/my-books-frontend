import { useApiToken } from '@/hooks/api/use-api-token';
import { useAuth } from '@/hooks/context/use-auth';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { validateToken } = useApiToken();
  const { confirmDialog } = useConfirmDialog();

  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isValid = await validateToken();
      console.log(isValid);

      if (isValid) {
        setIsAuthenticated(true);
      } else {
        logout();
        setIsAuthenticated(false);
        await confirmDialog({
          icon: 'i',
          title: 'ログアウトしました',
          message:
            'ログインしてから一定時間が経過したため、自動でログアウトしました。再度ログインしてください。',
          actionLabel: 'ログイン画面へ',
          actionOnly: true,
          persistent: true,
        });
      }
    };
    checkAuthentication();
  }, [logout, location, confirmDialog, validateToken]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
