import Logo from '@/components/layout/logo';
import FormInput from '@/components/shared/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AvatarCarousel from '@/components/users/avatar-carousel';
import { APP_TITLE, TOAST_ERROR_DURATION } from '@/constants/constants';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { useAuth } from '@/providers/auth-provider';
import { SignupRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const email = useFieldValidation<HTMLInputElement>();
  const password = useFieldValidation<HTMLInputElement>();
  const name = useFieldValidation<HTMLInputElement>();

  const [avatarPath, setAvatarPath] = useState('');

  const navigate = useNavigate();
  const { signup } = useAuth();

  const signupMutation = useMutation({
    mutationFn: (requestBody: SignupRequest) => signup(requestBody),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = email.validate.email();
    const isPasswordValid = password.validate.password();
    const isNameValid = name.validate.name();

    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }

    const requestBody: SignupRequest = {
      email: email.getValue(),
      password: password.getValue(),
      name: name.getValue(),
      avatarPath,
    };

    signupMutation.mutate(requestBody, {
      onSuccess: () => {
        toast.success('ユーザーを新規登録しました');
        navigate('/');
      },
      onError: () => {
        toast.error('新規登録できませんでした', {
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
          アカウントの作成
        </h1>
        <Card className="w-80 p-0 sm:w-96">
          <CardContent className="p-6 sm:p-10">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <FormInput
                ref={email.ref}
                label="メールアドレス"
                errorMessage={email.errorMessage}
                autoComplete="off"
                spellCheck="false"
              />

              <FormInput
                ref={password.ref}
                label="パスワード"
                errorMessage={password.errorMessage}
                type="password"
              />

              <Separator className="bg-foreground/10 mt-6 mb-2" />

              <FormInput
                ref={name.ref}
                label="ユーザー名"
                errorMessage={name.errorMessage}
                autoComplete="off"
                spellCheck="false"
              />

              <div>
                <Label className="text-sm" htmlFor="name">
                  アバター画像
                </Label>
                <AvatarCarousel value={avatarPath} onChange={setAvatarPath} />
              </div>

              <Button
                className="mt-2 w-full"
                type="submit"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <Loader2Icon
                    className="animate-spin"
                    aria-label="新規登録中"
                  />
                ) : (
                  '新規登録'
                )}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-y-1 text-sm">
              <p className="text-muted-foreground">
                アカウントをお持ちですか？
              </p>
              <Link to="/login">
                <p className="text-primary hover:underline">ログイン</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
