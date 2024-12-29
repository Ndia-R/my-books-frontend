import { useUser } from '@/hooks/use-user';
import { validateToken } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { setUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    console.log('protected route');

    const checkAuthentication = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
      if (!isValid) {
        setUser(null);
      }
    };
    checkAuthentication();
  }, [setUser]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
