import Logo from '@/components/layout/logo';
import PasswordInput from '@/components/settings/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { changeEmail } from '@/lib/action';
import { cn } from '@/lib/util';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const emailRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (!(email && password)) {
      if (email === '') setEmailErrorMessage('メールアドレスは必須です。');
      if (password === '') setPasswordErrorMessage('パスワードは必須です。');
      return;
    }

    const { isCancel } = await confirmDialog({
      icon: '?',
      title: '本当に変更しますか？',
      message: 'メールアドレス変更後、一度ログアウトします。',
    });
    if (isCancel) return;

    setIsSubmitting(true);
    const isSuccess = await changeEmail({ email, password });
    if (!isSuccess) {
      setIsSubmitting(false);
      toast({
        title: 'メールアドレスを変更できませんでした',
        description: '入力内容を確認してください',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    toast({ title: 'メールアドレスを変更し、ログアウトしました', duration: 5000 });

    await logout();
    setIsSubmitting(false);

    navigate('/login');
  };

  const handleCheckEmail = () => {
    setEmailErrorMessage('');

    if (!emailRef.current?.value) return;

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailRef.current.value)) {
      setEmailErrorMessage('無効なメールアドレスです。');
    }
  };

  return (
    <div className="my-3 flex flex-col place-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">メールアドレス変更</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="name">
                現在のメールアドレス
              </Label>
              <p className="my-2 rounded-full border border-transparent px-3 py-2 text-sm">
                {user?.email}
              </p>
            </div>

            <div>
              <Label className="text-xs" htmlFor="name">
                新しいメールアドレス
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
                現在のパスワード
              </Label>
              <PasswordInput
                className={cn(
                  'my-2 rounded-full',
                  passwordErrorMessage && 'border-destructive'
                )}
                id="password"
                name="password"
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
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : '変更'}
            </Button>
            <Button
              className="w-full rounded-full bg-transparent"
              type="button"
              variant="outline"
              asChild
            >
              <Link to="/settings/profile">キャンセル</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
