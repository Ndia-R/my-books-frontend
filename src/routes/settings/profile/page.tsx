import CountUpNumber from '@/components/count-up-number';
import Logo from '@/components/layout/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { KeyRoundIcon, MailIcon, UserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Page() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="my-3 flex flex-col items-center justify-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">プロフィール</p>
      <Card className="w-80 overflow-hidden rounded-3xl sm:w-96">
        <CardHeader className="h-80 w-full bg-gradient-to-tr from-secondary to-primary">
          <div className="flex flex-col items-center pt-8">
            <Avatar className="mb-4 size-24">
              <AvatarImage
                className="bg-primary"
                src={user.avatarUrl}
                alt="avatar-image"
              />
              <AvatarFallback className="bg-primary text-5xl font-semibold">
                {user.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="flex justify-between pt-8">
            <div className="animate-fadeInUp-4 delay-0">
              <div className="w-20 text-center">
                <p className="text-xl font-bold">
                  <CountUpNumber end={15} delay={300} />
                </p>
                <p className="text-sm">お気に入り</p>
              </div>
            </div>
            <div className="animate-fadeInUp-4 delay-100">
              <div className="w-20 text-center">
                <p className="text-xl font-bold">
                  <CountUpNumber end={32} delay={400} />
                </p>
                <p className="text-sm">マイリスト</p>
              </div>
            </div>
            <div className="animate-fadeInUp-4 delay-200">
              <div className="w-20 text-center">
                <p className="text-xl font-bold">
                  <CountUpNumber end={112} delay={500} />
                </p>
                <p className="text-sm">レビュー</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6">
          <ul>
            <li className="flex items-center p-2">
              <UserRoundIcon className="mr-4" />
              <p>ユーザー情報</p>
              <div className="flex-1"></div>
              <Button className="rounded-full bg-transparent" variant="outline" asChild>
                <Link to="/settings/change-user-info">変更</Link>
              </Button>
            </li>
            <li className="flex items-center p-2">
              <MailIcon className="mr-4" />
              <p>メールアドレス</p>
              <div className="flex-1"></div>
              <Button className="rounded-full bg-transparent" variant="outline" asChild>
                <Link to="/settings/change-email">変更</Link>
              </Button>
            </li>
            <li className="flex items-center p-2">
              <KeyRoundIcon className="mr-4" />
              <p>パスワード</p>
              <div className="flex-1"></div>
              <Button className="rounded-full bg-transparent" variant="outline" asChild>
                <Link to="/settings/change-password">変更</Link>
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
