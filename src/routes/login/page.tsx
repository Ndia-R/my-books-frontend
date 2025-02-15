import Logo from '@/components/layout/logo';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { login } from '@/lib/auth';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    setIsSubmitting(true);
    const isSuccess = await login({ email, password });
    if (!isSuccess) {
      setIsSubmitting(false);
      toast({
        title: 'ログインできませんでした',
        description: 'メールアドレスまたはパスワードが違います',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    await fetchUser();
    setIsSubmitting(false);

    const pathname = location.state?.from?.pathname || '/';
    const query = location.state?.from?.search || '';
    navigate(pathname + query, { replace: true });
  };

  return (
    <div className="my-3 flex flex-col place-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">ログイン</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="email">
                メールアドレス
              </Label>
              <Input
                ref={emailRef}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'ログイン'}
            </Button>
          </form>

          <div className="mt-6 flex justify-center gap-x-1 text-xs">
            <p className="text-muted-foreground">アカウントをお持ちでない方はこちら</p>
            <Link to={'/signup'}>
              <p className="text-primary hover:underline">新規登録</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
