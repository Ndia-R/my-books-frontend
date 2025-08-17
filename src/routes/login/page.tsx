import Logo from '@/components/layout/logo';
import FormInput from '@/components/shared/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_TITLE, TOAST_ERROR_DURATION } from '@/constants/constants';
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
        <h1 className="mt-4 text-lg font-semibold sm:text-xl">ログイン</h1>
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

              <Button
                className="mt-6 w-full"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Loader2Icon
                    className="animate-spin"
                    aria-label="ログイン中"
                  />
                ) : (
                  'ログイン'
                )}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-y-1 text-sm">
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
