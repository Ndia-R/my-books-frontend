import type { PermissionSet } from '@/constants/permission-sets';
import { useAuth } from '@/providers/auth-provider';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

type Props = {
  permissionSets?: PermissionSet[];
};

export default function ProtectedRoute({ permissionSets }: Props) {
  const { isLoading, isAuthenticated, hasAnyPermissionSet, login } = useAuth();
  const location = useLocation();

  // 未認証の場合、Keycloakログイン画面へ直接リダイレクト
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      login(location.pathname + location.search);
    }
  }, [isLoading, isAuthenticated, login, location.pathname, location.search]);

  // ローディング中または未認証の場合は何も表示しない
  if (isLoading || !isAuthenticated) {
    return null;
  }

  // 権限セットを持っていない場合はアクセス権限なし画面へ遷移
  if (permissionSets && !hasAnyPermissionSet(permissionSets)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
