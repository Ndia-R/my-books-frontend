import Logo from '@/components/layout/logo';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { signup } from '@/lib/auth';
import { checkUsernameExists, getCurrentUser } from '@/lib/data';
import { cn } from '@/lib/util';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (!(name && email && password)) {
      if (name === '') setNameErrorMessage('ユーザー名は必須です。');
      if (email === '') setEmailErrorMessage('メールアドレスは必須です。');
      if (password === '') setPasswordErrorMessage('パスワードは必須です。');
      return;
    }

    setIsSubmitting(true);
    const isSuccess = await signup({ name, email, password });
    if (!isSuccess) {
      setIsSubmitting(false);
      toast({
        title: '新規登録できませんでした',
        description: '入力内容を確認してください',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsSubmitting(false);

    navigate('/');
  };

  const handleCheckName = async () => {
    setNameErrorMessage('');

    if (!nameRef.current?.value) return;

    if (await checkUsernameExists(nameRef.current.value)) {
      setNameErrorMessage('そのユーザー名はすでに使われています。');
    }
  };

  const handleCheckEmail = () => {
    setEmailErrorMessage('');

    if (!emailRef.current?.value) return;

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailRef.current.value)) {
      setEmailErrorMessage('無効なメールアドレスです。');
    }
  };

  const handleCheckPassword = () => {
    setPasswordErrorMessage('');

    if (!passwordRef.current?.value) return;

    if (passwordRef.current.value.length < 4) {
      setPasswordErrorMessage('パスワードは4文字以上で設定してください。');
    }
  };

  return (
    <div className="my-3 flex flex-col place-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">アカウントの作成</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="name">
                ユーザー名
              </Label>
              <Input
                ref={nameRef}
                className={cn(
                  'my-2 rounded-full',
                  nameErrorMessage && 'border-destructive'
                )}
                id="name"
                name="name"
                autoComplete="off"
                spellCheck="false"
                onBlur={handleCheckName}
              />
              {nameErrorMessage && (
                <p className="text-xs text-destructive">{nameErrorMessage}</p>
              )}
            </div>

            <div>
              <Label className="text-xs" htmlFor="email">
                メールアドレス
              </Label>
              <Input
                ref={emailRef}
                className={cn(
                  'my-2 rounded-full',
                  emailErrorMessage && 'border-destructive'
                )}
                id="email"
                name="email"
                autoComplete="off"
                spellCheck="false"
                onBlur={handleCheckEmail}
              />
              {emailErrorMessage && (
                <p className="text-xs text-destructive">{emailErrorMessage}</p>
              )}
            </div>

            <div>
              <Label className="text-xs" htmlFor="password">
                パスワード
              </Label>
              <PasswordInput
                ref={passwordRef}
                className={cn(
                  'my-2 rounded-full',
                  passwordErrorMessage && 'border-destructive'
                )}
                id="password"
                name="password"
                onBlur={handleCheckPassword}
              />
              {passwordErrorMessage && (
                <p className="text-xs text-destructive">{passwordErrorMessage}</p>
              )}
            </div>

            <Button
              className="mt-6 w-full rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : '新規登録'}
            </Button>
          </form>

          <div className="mt-6 flex justify-center gap-x-1 text-xs">
            <p className="text-muted-foreground">アカウントをお持ちですか？</p>
            <Link to={'/login'}>
              <p className="text-primary hover:underline">ログイン</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
