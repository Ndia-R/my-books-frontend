import { useAuth } from '@/entities/user';
import { APP_TITLE } from '@/shared/config/constants';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { CrownIcon, PaletteIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const settingList = [
    {
      label: 'テーマ',
      href: '/settings/theme',
      icon: PaletteIcon,
      canEdit: isAuthenticated,
    },
    {
      label: 'プラン',
      href: '/settings/plan',
      icon: CrownIcon,
      canEdit: true,
    },
  ];

  const handleClick = (href: string) => {
    navigate(href);
  };

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-4 flex h-10 items-center">
        <h1 className="text-lg font-bold sm:text-xl">設定</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <div className="mb-4 flex flex-col gap-y-4">
        <ul className="flex flex-col gap-y-4 px-4 sm:w-80">
          {settingList.map((item) => (
            <li className="flex items-center justify-between" key={item.label}>
              <div className="flex items-center gap-x-3">
                <item.icon className="size-4" />
                <p>{item.label}</p>
              </div>
              <Button
                variant="outline"
                disabled={!item.canEdit}
                onClick={() => handleClick(item.href)}
              >
                変更
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
