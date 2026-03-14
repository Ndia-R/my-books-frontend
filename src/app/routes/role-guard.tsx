import type { Role } from '@/shared/config/roles';
import { useAuth } from '@/app/providers/auth-provider';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  roles: Role[];
};

export default function RoleGuard({ roles, children }: Props) {
  const { hasAnyRole } = useAuth();

  if (!hasAnyRole(roles)) return null;

  return <>{children}</>;
}
