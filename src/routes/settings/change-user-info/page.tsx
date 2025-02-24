import Logo from '@/components/layout/logo';
import AvatarCarousel from '@/components/settings/avatar-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApiUser } from '@/hooks/api/use-api-user';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { UpdateCurrentUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Page() {
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { updateCurrentUser } = useApiUser();
  const { toast } = useToast();

  const [avatarUrl, setAvaterUrl] = useState(user?.avatarUrl || '');

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateCurrentUser) => updateCurrentUser(requestBody),
  });

  useEffect(() => {
    const init = async () => {
      if (nameRef.current && user) {
        nameRef.current.focus();
        nameRef.current.value = user.name || '';
      }
    };
    init();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;

    if (name === '') {
      setNameErrorMessage('ユーザー名は必須です。');
      return;
    }

    // if (user?.name !== name && (await checkUsernameExists(name))) {
    //   setNameErrorMessage('そのユーザー名はすでに使われています。');
    //   return;
    // }

    const requestBody: UpdateCurrentUser = { name, avatarUrl };
    updateMutation.mutate(requestBody, {
      onSuccess: () => {
        const newUser = user ? { ...user, name, avatarUrl } : null;
        setUser(newUser);
        toast({ title: 'ユーザー情報を変更しました' });
        navigate('/settings/profile');
      },
      onError: (error) => {
        console.log(error);

        toast({
          title: 'ユーザー情報を変更できませんでした',
          description: '入力内容を確認してください。',
          variant: 'destructive',
          duration: 5000,
        });
      },
    });
  };

  return (
    <div className="my-3 flex flex-col place-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">ユーザー情報の編集</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="name">
                ユーザー名
              </Label>
              <Input
                ref={nameRef}
                className="my-2 rounded-full"
                id="name"
                name="name"
                autoComplete="off"
                spellCheck="false"
              />
              <p className="h-4 text-xs text-destructive">{nameErrorMessage}</p>
            </div>

            <div className="mb-4">
              <Label className="text-xs" htmlFor="name">
                アバター画像
              </Label>
              <AvatarCarousel value={avatarUrl} onChange={setAvaterUrl} />
            </div>

            <Button
              className="w-full rounded-full"
              type="submit"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                '変更'
              )}
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
