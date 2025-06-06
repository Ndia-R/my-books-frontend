import Logo from '@/components/layout/logo';
import UserProfileCounts from '@/components/profile/user-profile-counts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { APP_TITLE, AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { useUser } from '@/providers/user-provider';
import ErrorElement from '@/routes/error-element';
import { KeyRoundIcon, MailIcon, UserRoundPenIcon } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';

const CHANGE_LIST = [
  {
    id: 1,
    icon: UserRoundPenIcon,
    title: 'ユーザー情報',
    linkTo: '/profile/change-user-info',
    linkLabel: '変更',
  },
  {
    id: 2,
    icon: MailIcon,
    title: 'メールアドレス',
    linkTo: '/profile/change-email',
    linkLabel: '変更',
  },
  {
    id: 3,
    icon: KeyRoundIcon,
    title: 'パスワード',
    linkTo: '/profile/change-password',
    linkLabel: '変更',
  },
];

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { user } = useUser();

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="font-semibold">プロフィール</h1>

        <Card className="w-80 overflow-hidden p-0 sm:w-96">
          <CardHeader className="from-secondary/50 to-primary w-full bg-linear-to-tr p-0">
            <div className="flex flex-col items-center pt-12">
              <Avatar className="size-24">
                <AvatarImage
                  className="bg-foreground/30"
                  src={AVATAR_IMAGE_BASE_URL + user?.avatarPath}
                  alt="avatar-image"
                />
                <AvatarFallback className="bg-primary text-5xl font-semibold">
                  {user?.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="w-full p-4 text-center">
                <p className="text-xl font-semibold">{user?.name}</p>
                <p className="text-sm">{user?.email}</p>
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
                <li className="flex items-center justify-between" key={item.id}>
                  <div className="flex gap-x-4">
                    <item.icon />
                    <p>{item.title}</p>
                  </div>
                  <Link
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'bg-transparent'
                    )}
                    to={item.linkTo}
                  >
                    {item.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
