import FormInput from '@/components/form-input';
import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_TITLE } from '@/constants/constants';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { useAuth } from '@/providers/auth-provider';
import { LoginRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const email = useFieldValidation<HTMLInputElement>();
  const password = useFieldValidation<HTMLInputElement>();

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (requestBody: LoginRequest) => login(requestBody),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = email.validate.email();
    const isPasswordValid = password.validate.password();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const requestBody: LoginRequest = {
      email: email.getValue(),
      password: password.getValue(),
    };

    loginMutation.mutate(requestBody, {
      onSuccess: () => {
        const pathname = location.state?.from?.pathname || '/';
        const query = location.state?.from?.search || '';
        navigate(pathname + query, { replace: true });
      },
      onError: () => {
        toast.error('ログインできませんでした', {
          description: 'メールアドレスまたはパスワードが違います。',
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
        <h1 className="font-semibold">ログイン</h1>
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

              <Button
                className="mt-6 w-full rounded-full"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  'ログイン'
                )}
              </Button>
            </form>

            <div className="mt-6 flex justify-center gap-x-1 text-xs">
              <p className="text-muted-foreground">
                アカウントをお持ちでない方はこちら
              </p>
              <Link to="/signup" className="text-primary hover:underline">
                新規登録
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
