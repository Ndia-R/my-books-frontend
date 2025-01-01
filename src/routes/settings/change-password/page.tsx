import Logo from '@/components/layout/logo';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { changePassword, getCurrentUser } from '@/lib/data';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPasswordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    currentPasswordRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const currentPassword = form.get('current-password') as string;
    const newPassword = form.get('new-password') as string;
    const confirmNewPassword = form.get('confirm-new-password') as string;

    setIsSubmitting(true);
    const isSuccess = await changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (!isSuccess) {
      setIsSubmitting(false);
      toast({
        title: 'パスワード変更できませんでした',
        description: '入力内容を確認してください',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    toast({ title: 'パスワード変更しました' });

    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsSubmitting(false);

    navigate('/settings/profile');
  };

  return (
    <div className="my-3 flex flex-col items-center justify-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">パスワード変更</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="current-password">
                現在のパスワード
              </Label>
              <PasswordInput
                ref={currentPasswordRef}
                className="my-2 rounded-full"
                id="current-password"
                name="current-password"
              />
            </div>

            <div>
              <Label className="text-xs" htmlFor="new-password">
                新しいパスワード
              </Label>
              <PasswordInput
                className="my-2 rounded-full"
                id="new-password"
                name="new-password"
              />
            </div>

            <div>
              <Label className="text-xs" htmlFor="confirm-new-password">
                新しいパスワード（確認用）
              </Label>
              <PasswordInput
                className="my-2 rounded-full"
                id="confirm-new-password"
                name="confirm-new-password"
              />
            </div>

            <Button
              className="mt-6 w-full rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : '変更'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
