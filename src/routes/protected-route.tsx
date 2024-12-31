import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useUser } from '@/hooks/use-user';
import { validateToken } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { setUser } = useUser();
  const { confirmDialog } = useConfirmDialog();

  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isValid = await validateToken();
      if (isValid === null) {
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
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, [setUser, location, confirmDialog]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
