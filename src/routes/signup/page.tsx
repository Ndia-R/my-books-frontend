import FormInput from '@/components/form-input';
import Logo from '@/components/layout/logo';
import AvatarCarousel from '@/components/profile/avatar-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';
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
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
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
          duration: 5000,
        });
      },
    });
  };

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-3 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="font-semibold">アカウントの作成</h1>
        <Card className="w-80 rounded-3xl p-6 sm:w-96 sm:p-10">
          <CardContent className="p-0">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <FormInput
                label="メールアドレス"
                ref={email.ref}
                errorMessage={email.errorMessage}
                autoComplete="off"
                spellCheck="false"
              />

              <FormInput
                label="パスワード"
                ref={password.ref}
                errorMessage={password.errorMessage}
                type="password"
              />

              <Separator className="bg-foreground/10 mt-6 mb-2" />

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
                className="mt-2 w-full rounded-full"
                type="submit"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  '新規登録'
                )}
              </Button>
            </form>

            <div className="mt-6 flex justify-center gap-x-1 text-xs">
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
