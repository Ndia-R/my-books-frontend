import type { PermissionSet } from '@/constants/permission-sets';
import { useAuth } from '@/providers/auth-provider';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  permissionSets: PermissionSet[];
};

export default function PermissionGuard({ permissionSets, children }: Props) {
  const { hasAnyPermissionSet } = useAuth();

  if (!hasAnyPermissionSet(permissionSets)) return null;

  return <>{children}</>;
}
