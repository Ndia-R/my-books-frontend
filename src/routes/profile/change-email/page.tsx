import FormInput from '@/components/form-input';
import Logo from '@/components/layout/logo';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_TITLE } from '@/constants/constants';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { updateUserEmail } from '@/lib/api/user';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useUser } from '@/providers/user-provider';
import { UpdateUserEmail } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const email = useFieldValidation<HTMLInputElement>();
  const password = useFieldValidation<HTMLInputElement>();

  const navigate = useNavigate();

  const { logout } = useAuth();
  const { user } = useUser();

  const { confirmDialog } = useConfirmDialog();

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateUserEmail) => updateUserEmail(requestBody),
    onSuccess: async () => {
      await logout();
      navigate('/login');
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = email.validate.email();
    const isPasswordValid = password.validate.password();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const { isCancel } = await confirmDialog({
      icon: 'question',
      title: '本当に変更しますか？',
      message: 'メールアドレス変更後、一度ログアウトします。',
    });
    if (isCancel) return;

    const requestBody: UpdateUserEmail = {
      email: email.getValue(),
      password: password.getValue(),
    };

    updateMutation.mutate(requestBody, {
      onSuccess: async () => {
        toast.success('メールアドレスを変更し、ログアウトしました', {
          duration: 5000,
        });
      },
      onError: () => {
        toast.error('メールアドレスを変更できませんでした', {
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
        <h1 className="font-semibold">メールアドレス変更</h1>
        <Card className="w-80 sm:w-96">
          <CardContent className="p-6 sm:px-10">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <FormInput
                label="現在のメールアドレス"
                value={user?.email}
                readOnly
              />

              <FormInput
                label="新しいメールアドレス"
                ref={email.ref}
                errorMessage={email.errorMessage}
                autoComplete="off"
                spellCheck="false"
              />

              <FormInput
                label="現在のパスワード"
                ref={password.ref}
                errorMessage={password.errorMessage}
                type="password"
              />

              <Button
                className="mt-6 w-full"
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2Icon
                    className="animate-spin"
                    aria-label="メールアドレス変更中"
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
