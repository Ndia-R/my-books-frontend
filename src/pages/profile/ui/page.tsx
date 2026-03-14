import Logo from '@/widgets/layout/ui/logo';
import ErrorElement from '@/shared/ui/error-element';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import UserProfileCounts from '@/widgets/user-profile/ui/user-profile-counts';
import { APP_TITLE, AVATAR_IMAGE_BASE_URL } from '@/shared/config/constants';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/app/providers/auth-provider';
import type { MenuItem } from '@/shared/ui/types';
import {
  CrownIcon,
  LockKeyhole,
  PaletteIcon,
  UserRoundPenIcon,
} from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useLocation } from 'react-router';

const CHANGE_LIST: MenuItem[] = [
  {
    label: 'ユーザー情報',
    href: '/profile/change-user-info',
    icon: UserRoundPenIcon,
  },
  {
    label: 'テーマ',
    href: '/settings/theme',
    icon: PaletteIcon,
  },
  {
    label: 'プラン',
    href: '/settings/plan',
    icon: CrownIcon,
  },
];

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { userProfile, changePassword } = useAuth();
  const location = useLocation();

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="mt-4 text-lg font-semibold sm:text-xl">プロフィール</h1>

        <Card className="w-80 overflow-hidden p-0 sm:w-96">
          <CardHeader className="from-secondary/50 to-primary w-full bg-linear-to-tr p-0">
            <div className="flex flex-col items-center pt-12">
              <Avatar className="size-24">
                <AvatarImage
                  className="bg-foreground/20"
                  src={AVATAR_IMAGE_BASE_URL + userProfile?.avatarPath}
                  alt="avatar-image"
                />
                <AvatarFallback className="bg-primary text-5xl font-semibold">
                  {userProfile?.displayName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="h-20 w-full space-y-2 p-4 text-center">
                <p className="text-xl font-semibold">
                  {userProfile?.displayName}
                  <span className="ml-2 text-xs">
                    ({userProfile?.username})
                  </span>
                </p>
                <p className="text-sm">{userProfile?.email}</p>
              </div>

              <div className="h-20 w-full p-4">
                <ErrorBoundary fallback={<ErrorElement />}>
                  <Suspense fallback={null}>
                    <UserProfileCounts />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative p-6 pt-0">
            <ul className="flex flex-col gap-y-4">
              {CHANGE_LIST.map((item) => (
                <li
                  className="flex items-center justify-between"
                  key={item.label}
                >
                  <div className="flex items-center gap-x-3">
                    <item.icon className="size-4" />
                    <p>{item.label}</p>
                  </div>
                  <Link
                    className={cn(buttonVariants({ variant: 'outline' }))}
                    to={item.href}
                    aria-label={`${item.label}の変更`}
                  >
                    変更
                  </Link>
                </li>
              ))}
              <li
                className="flex items-center justify-between"
                key="password-change"
              >
                <div className="flex items-center gap-x-3">
                  <LockKeyhole className="size-4" />
                  <p>パスワード変更</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    changePassword(location.pathname + location.search)
                  }
                >
                  変更
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
