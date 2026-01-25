import Logo from '@/components/layout/logo';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AvatarCarousel from '@/components/users/avatar-carousel';
import {
  APP_TITLE,
  DEFAULT_AVATAR_PATH,
  TOAST_ERROR_DURATION,
} from '@/constants/constants';
import { updateUserProfile } from '@/lib/api/users';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import type { UpdateUserProfile } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useAuth();

  const [displayName, setDisplayName] = useState(
    userProfile?.displayName || ''
  );
  const [avatarPath, setAvatarPath] = useState(
    userProfile?.avatarPath || DEFAULT_AVATAR_PATH
  );

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateUserProfile) =>
      updateUserProfile(requestBody),
    onSuccess: () => {
      setUserProfile({
        ...userProfile!,
        displayName: displayName.trim(),
        avatarPath,
      });
      navigate('/profile');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody: UpdateUserProfile = {
      displayName: displayName.trim(),
      avatarPath,
    };

    updateMutation.mutate(requestBody, {
      onSuccess: () => {
        toast.success('ユーザー情報を変更しました');
      },
      onError: () => {
        toast.error('ユーザー情報を変更できませんでした', {
          description: '入力内容を確認してください。',
          duration: TOAST_ERROR_DURATION,
        });
      },
    });
  };

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="mt-4 text-lg font-semibold sm:text-xl">
          ユーザー情報変更
        </h1>
        <Card className="w-80 p-0 sm:w-96">
          <CardContent className="p-6 sm:px-10">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <Label className="text-sm" htmlFor="display-name">
                  表示名
                </Label>
                <Input
                  className={cn(
                    'border-foreground/20 my-2',
                    !displayName.trim() && 'border-destructive'
                  )}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  id="display-name"
                  autoComplete="off"
                  spellCheck="false"
                />

                {!displayName.trim() && (
                  <p className="text-destructive text-sm">表示名は必須です。</p>
                )}
              </div>

              <div>
                <Label className="text-sm" htmlFor="name">
                  アバター画像
                </Label>
                <AvatarCarousel value={avatarPath} onChange={setAvatarPath} />
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={updateMutation.isPending || !displayName.trim()}
              >
                {updateMutation.isPending ? (
                  <Loader2Icon
                    className="animate-spin"
                    aria-label="プロフィール変更中"
                  />
                ) : (
                  '変更'
                )}
              </Button>

              <Link
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                to="/profile"
              >
                キャンセル
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
