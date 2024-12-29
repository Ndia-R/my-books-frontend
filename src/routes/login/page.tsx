import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { login } from '@/lib/auth';
import { getCurrentUser } from '@/lib/data';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShownPassword, setIsShownPassword] = useState(false);

  const ref = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = (form.get('email') as string) || '';
    const password = (form.get('password') as string) || '';

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

    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsSubmitting(false);

    const pathname = location.state?.from?.pathname || '/';
    const query = location.state?.from?.search || '';
    navigate(pathname + query, { replace: true });
  };

  return (
    <div>
      <div className="mt-3 flex flex-col items-center justify-items-center gap-y-3 sm:mt-16">
        <Logo size="lg" />
        <p className="font-semibold">ログイン</p>
        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <form className="flex w-72 flex-col gap-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="text-xs" htmlFor="email">
                  メールアドレス
                </Label>
                <Input
                  ref={ref}
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
                <div className="relative">
                  <Input
                    className="my-2 rounded-full"
                    id="password"
                    name="password"
                    type={isShownPassword ? 'text' : 'password'}
                  />
                  <Button
                    className="absolute right-0 top-0 rounded-full hover:bg-transparent hover:text-foreground"
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsShownPassword(!isShownPassword)}
                  >
                    {isShownPassword ? (
                      <EyeIcon className="size-4" />
                    ) : (
                      <EyeOffIcon className="size-4" />
                    )}
                  </Button>
                </div>
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
              <Link to={'/sign-up'}>
                <p className="text-primary hover:underline">新規登録</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
