import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_TITLE } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { BookOpenIcon, CheckIcon, XIcon } from 'lucide-react';
import { useLocation } from 'react-router';

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
  },
  {
    name: 'スタンダード',
    description: 'STANDARD (無料会員)',
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
    variant: 'outline',
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
    buttonTitle: '今すぐ登録',
    variant: 'default',
  },
];

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { login } = useAuth();
  const location = useLocation();

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-6 flex flex-col place-items-center gap-y-3 sm:my-16">
        <Logo size="lg" disableLink />
        <h1 className="mt-4 text-lg font-semibold sm:text-xl">プラン</h1>

        <div className="mx-auto grid items-stretch gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <Card className="w-80 overflow-hidden p-0 pb-6" key={plan.name}>
              <CardHeader className="from-secondary/50 to-primary w-full bg-linear-to-tr p-6">
                <CardTitle className="text-3xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-foreground text-sm">
                  {plan.description}
                </CardDescription>
                <p className="mt-6 text-right">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={cn('ml-1 text-sm')}>{plan.priceSuffix}</span>
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li className="flex items-center" key={feature.text}>
                      <feature.icon
                        className={cn(
                          'h-5 w-5',
                          feature.canUse ? 'text-primary' : 'text-destructive'
                        )}
                      />
                      <span className="text-muted-foreground ml-2 text-sm">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.buttonTitle && (
                  <Button
                    className={'w-full'}
                    variant={plan.variant === 'default' ? 'default' : 'outline'}
                    onClick={() => login(location.pathname + location.search)}
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
