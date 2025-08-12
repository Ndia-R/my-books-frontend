import Logo from '@/components/layout/logo';
import FormInput from '@/components/shared/form-input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_TITLE, TOAST_ERROR_DURATION } from '@/constants/constants';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { updateUserPassword } from '@/lib/api/user';
import { cn } from '@/lib/utils';
import { UpdateUserPassword } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const currentPassword = useFieldValidation<HTMLInputElement>();
  const newPassword = useFieldValidation<HTMLInputElement>();
  const confirmPassword = useFieldValidation<HTMLInputElement>();

  const navigate = useNavigate();

  const { confirmDialog } = useConfirmDialog();

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateUserPassword) =>
      updateUserPassword(requestBody),
    onSuccess: () => {
      navigate('/profile');
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCurrentPasswordValid = currentPassword.validate.password();
    const isNewPasswordValid = newPassword.validate.password();
    const isConfirmPasswordValid = confirmPassword.validate.confirmPassword(
      newPassword.getValue()
    );

    if (
      !isCurrentPasswordValid ||
      !isNewPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return;
    }

    const { isCancel } = await confirmDialog({
      icon: 'question',
      title: '本当に変更しますか？',
      message: 'パスワードを変更します。',
    });
    if (isCancel) return;

    const requestBody: UpdateUserPassword = {
      currentPassword: currentPassword.getValue(),
      newPassword: newPassword.getValue(),
      confirmPassword: confirmPassword.getValue(),
    };

    updateMutation.mutate(requestBody, {
      onSuccess: () => {
        toast.success('パスワードを変更しました');
      },
      onError: () => {
        toast.error('パスワードを変更できませんでした', {
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
        <h1 className="font-semibold">パスワード変更</h1>
        <Card className="w-80 sm:w-96">
          <CardContent className="p-6 sm:px-10">
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <FormInput
                label="現在のパスワード"
                ref={currentPassword.ref}
                errorMessage={currentPassword.errorMessage}
                type="password"
              />

              <FormInput
                label="新しいパスワード"
                ref={newPassword.ref}
                errorMessage={newPassword.errorMessage}
                type="password"
              />

              <FormInput
                label="新しいパスワード（確認用）"
                ref={confirmPassword.ref}
                errorMessage={confirmPassword.errorMessage}
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
                    aria-label="パスワード変更中"
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
