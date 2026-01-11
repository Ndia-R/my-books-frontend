import type { RoleType } from '@/constants/roles';
import { useAuth } from '@/providers/auth-provider';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  roles: RoleType[];
};

export default function RoleGuard({ roles, children }: Props) {
  const { hasRole } = useAuth();

  if (!roles.some((role) => hasRole(role))) return null;

  return <>{children}</>;
}
