import {
  updateSubscriptionPlan,
  useAuth,
  type UpdateSubscriptionPlan,
} from '@/entities/user';
import { APP_TITLE, TOAST_ERROR_DURATION } from '@/shared/config/constants';
import { Role } from '@/shared/config/roles';
import { SubscriptionPlan } from '@/shared/config/subscription-plans';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import Logo from '@/widgets/layout/ui/logo';
import { useMutation } from '@tanstack/react-query';
import { BookOpenIcon, CheckIcon, CrownIcon, XIcon } from 'lucide-react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { signup, isAuthenticated, hasRole, hasPlan, setUserProfile } =
    useAuth();
  const location = useLocation();

  const isGeneralUser = hasRole(Role.USER) && hasPlan(SubscriptionPlan.FREE);
  const isPremiumUser = hasRole(Role.USER) && hasPlan(SubscriptionPlan.PREMIUM);

  const { confirmDialog } = useConfirmDialog();

  const updateMutation = useMutation({
    mutationFn: (requestBody: UpdateSubscriptionPlan) =>
      updateSubscriptionPlan(requestBody),
  });

  const startSubscription = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'info',
      title: 'プレミアムプランに申し込みますか？',
      message:
        'プレミアムプランに申し込むと、月額980円で、すべての書籍を読み放題にできます。',
      actionLabel: '申し込む',
    });
    if (isCancel) return;

    const requestBody: UpdateSubscriptionPlan = {
      subscriptionPlan: SubscriptionPlan.PREMIUM,
    };
    updateMutation.mutate(requestBody, {
      onSuccess: (data) => {
        setUserProfile(data);
        toast.success('プランを変更しました');
      },
      onError: () => {
        toast.error('プランの変更に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
    });
  };

  const cancelSubscription = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: 'プレミアムプランを解除しますか？',
      message:
        'プレミアムプランを解除すると、月額980円の料金が発生しなくなりますが、すべての書籍が読み放題でなくなります。',
      actionLabel: '解除',
    });
    if (isCancel) return;

    const requestBody: UpdateSubscriptionPlan = {
      subscriptionPlan: SubscriptionPlan.FREE,
    };
    updateMutation.mutate(requestBody, {
      onSuccess: (data) => {
        setUserProfile(data);
        toast.success('プランを変更しました');
      },
      onError: () => {
        toast.error('プランの変更に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
    });
  };

  const plans = [
    {
      name: 'ゲスト',
      description: 'GUEST (未ログイン)',
      price: '',
      priceSuffix: '',
      features: [
        { text: '試し読みのみ', icon: BookOpenIcon, canUse: true },
        { text: '書籍の検索', icon: CheckIcon, canUse: true },
        { text: 'レビュー閲覧', icon: XIcon, canUse: false },
        { text: 'レビュー投稿', icon: XIcon, canUse: false },
        { text: 'お気に入り登録', icon: XIcon, canUse: false },
        { text: 'ブックマーク機能', icon: XIcon, canUse: false },
        { text: 'テーマの設定', icon: XIcon, canUse: false },
      ],
      buttonTitle: '',
      variant: '',
      currentPlan: !isAuthenticated,
      buttonAction: undefined,
    },
    {
      name: 'フリー',
      description: 'FREE (無料会員)',
      price: '¥0',
      priceSuffix: '/ 月',
      features: [
        { text: '試し読みのみ', icon: BookOpenIcon, canUse: true },
        { text: '書籍の検索', icon: CheckIcon, canUse: true },
        { text: 'レビュー閲覧', icon: CheckIcon, canUse: true },
        { text: 'レビュー投稿', icon: XIcon, canUse: false },
        { text: 'お気に入り登録', icon: CheckIcon, canUse: true },
        { text: 'ブックマーク機能', icon: XIcon, canUse: false },
        { text: 'テーマの設定', icon: CheckIcon, canUse: true },
      ],
      buttonTitle: '無料で始める',
      variant: 'default',
      currentPlan: isGeneralUser,
      buttonAction: !isAuthenticated
        ? () => signup(location.pathname + location.search)
        : undefined,
    },
    {
      name: 'プレミアム',
      description: 'PREMIUM (有料会員)',
      price: '¥980',
      priceSuffix: '/ 月',
      features: [
        { text: '読み放題', icon: BookOpenIcon, canUse: true },
        { text: '書籍の検索', icon: CheckIcon, canUse: true },
        { text: 'レビュー閲覧', icon: CheckIcon, canUse: true },
        { text: 'レビュー投稿', icon: CheckIcon, canUse: true },
        { text: 'お気に入り登録', icon: CheckIcon, canUse: true },
        { text: 'ブックマーク機能', icon: CheckIcon, canUse: true },
        { text: 'テーマの設定', icon: CheckIcon, canUse: true },
      ],
      buttonTitle: !isAuthenticated
        ? ''
        : isPremiumUser
          ? '登録解除'
          : '申し込み',
      variant: isPremiumUser ? 'outline' : 'default',
      currentPlan: isPremiumUser,
      buttonAction: isPremiumUser ? cancelSubscription : startSubscription,
    },
  ];

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="mt-4 text-lg font-semibold sm:text-xl">プラン</h1>

        <div className="mx-auto grid items-stretch gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <Card className="w-80 p-0 pb-6" key={plan.name}>
              <CardHeader className="from-secondary/50 to-primary relative w-full rounded-t-xl bg-linear-to-tr p-6">
                {plan.currentPlan && (
                  <Badge className="absolute top-4 left-4 shadow-lg">
                    <CrownIcon data-icon="inline-start" />
                    現在のプラン
                  </Badge>
                )}
                <CardTitle className="mt-6 text-3xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-foreground text-sm">
                  {plan.description}
                </CardDescription>
                <p className="text-right">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={cn('ml-1 text-sm')}>{plan.priceSuffix}</span>
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      className={cn(
                        'flex items-center',
                        feature.canUse
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground/40'
                      )}
                      key={feature.text}
                    >
                      <feature.icon
                        className={cn(
                          'h-5 w-5',
                          feature.canUse
                            ? 'text-primary'
                            : 'text-destructive/40'
                        )}
                      />
                      <span className="ml-2 text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.buttonTitle && plan.buttonAction && (
                  <Button
                    className={'w-full'}
                    variant={plan.variant === 'default' ? 'default' : 'outline'}
                    onClick={plan.buttonAction}
                  >
                    {plan.buttonTitle}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
