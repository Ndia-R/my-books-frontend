import FormInput from '@/components/form-input';
import Logo from '@/components/layout/logo';
import AvatarCarousel from '@/components/profile/avatar-carousel';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { APP_TITLE } from '@/constants/constants';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { updateUserProfile } from '@/lib/api/user';
import { cn } from '@/lib/utils';
import { useUser } from '@/providers/user-provider';
import { UpdateUserProfile } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const name = useFieldValidation<HTMLInputElement>();

  const navigate = useNavigate();

  const { user, setCurrentUser } = useUser();

  const [avatarPath, setAvatarPath] = useState(user?.avatarPath || '');

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateUserProfile) =>
      updateUserProfile(requestBody),
    onSuccess: () => {
      navigate('/profile');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (name.ref.current && user) {
      name.ref.current.value = user.name || '';
    }
  }, [name.ref, user]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = name.validate.name();
    if (!isNameValid) {
      return;
    }

    const requestBody: UpdateUserProfile = {
      name: name.getValue(),
      avatarPath,
    };

    updateMutation.mutate(requestBody, {
      onSuccess: async () => {
        await setCurrentUser();
        toast.success('ユーザー情報を変更しました');
      },
      onError: () => {
        toast.error('ユーザー情報を変更できませんでした', {
          description: '入力内容を確認してください。',
          duration: 5000,
        });
      },
    });
  };

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="font-semibold">ユーザー情報変更</h1>
        <Card className="w-80 rounded-3xl sm:w-96">
          <CardContent className="p-6 sm:px-10">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <FormInput
                label="ユーザー名"
                ref={name.ref}
                errorMessage={name.errorMessage}
                autoComplete="off"
                spellCheck="false"
              />

              <div>
                <Label className="text-xs" htmlFor="name">
                  アバター画像
                </Label>
                <AvatarCarousel value={avatarPath} onChange={setAvatarPath} />
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

              <Link
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full rounded-full bg-transparent'
                )}
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
