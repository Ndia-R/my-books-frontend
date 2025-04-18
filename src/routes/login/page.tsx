import Logo from '@/components/layout/logo';
import PasswordInput from '@/components/profile/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePageTitle } from '@/hooks/use-page-title';
import { useAuth } from '@/providers/auth-provider';
import { LoginRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  usePageTitle(title);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (requestBody: LoginRequest) => login(requestBody),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const requestBody: LoginRequest = { email, password };
    loginMutation.mutate(requestBody, {
      onSuccess: () => {
        const pathname = location.state?.from?.pathname || '/';
        const query = location.state?.from?.search || '';
        navigate(pathname + query, { replace: true });
      },
      onError: () => {
        toast.error('ログインできませんでした', {
          description: 'メールアドレスまたはパスワードが違います。',
          duration: 5000,
        });
      },
    });
  };

  return (
    <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <h1 className="font-semibold">ログイン</h1>
      <Card className="w-80 rounded-3xl p-6 sm:w-96 sm:p-10">
        <CardContent className="p-0">
          <form
            className="flex w-full flex-col gap-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label className="text-xs" htmlFor="email">
                メールアドレス
              </Label>
              <Input
                className="my-2 rounded-full"
                id="email"
                name="email"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <div>
              <Label className="text-xs" htmlFor="password">
                パスワード
              </Label>
              <PasswordInput
                className="my-2 rounded-full"
                id="password"
                name="password"
              />
            </div>

            <Button
              className="mt-6 w-full rounded-full"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                'ログイン'
              )}
            </Button>
          </form>

          <div className="mt-6 flex justify-center gap-x-1 text-xs">
            <p className="text-muted-foreground">
              アカウントをお持ちでない方はこちら
            </p>
            <Link to="/signup" className="text-primary hover:underline">
              新規登録
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
