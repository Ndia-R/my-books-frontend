import type { Role } from '@/shared/config/roles';
import type { SubscriptionPlan } from '@/shared/config/subscription-plans';
import { useAuth } from '@/app/providers/auth-provider';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

type Props = {
  roles?: Role[];
  plans?: SubscriptionPlan[];
};

export default function ProtectedRoute({ roles, plans }: Props) {
  const { isLoading, isAuthenticated, hasAnyRole, hasAnyPlan, login } =
    useAuth();
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

  // ロールまたはプランを持っていない場合はアクセス権限なし画面へ遷移
  if ((roles && !hasAnyRole(roles)) || (plans && !hasAnyPlan(plans))) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
