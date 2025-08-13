import NavigateLink from '@/components/layout/navigate-link';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types';
import { AwardIcon, ChartLineIcon, SettingsIcon, TagIcon } from 'lucide-react';
import { useLocation } from 'react-router';

const NAV_LIST: MenuItem[] = [
  {
    label: 'ジャンル',
    href: '/discover?genreIds=1&condition=SINGLE',
    icon: TagIcon,
  },
  { label: 'ランキング', href: '/ranking', icon: ChartLineIcon },
  { label: '特集', href: '/special-features', icon: AwardIcon },
  { label: '設定', href: '/settings', icon: SettingsIcon },
];

type Props = {
  onClick?: () => void;
};

export default function NavList({ onClick }: Props) {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2">
        {NAV_LIST.map((item) => (
          <li key={item.label}>
            <NavigateLink
              className={cn(
                location.pathname !== '/' &&
                  item.href.includes(location.pathname) &&
                  'text-primary'
              )}
              href={item.href}
              onClick={onClick}
            >
              {item.label}
            </NavigateLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
