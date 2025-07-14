import NavigateLink from '@/components/layout/navigate-link';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';

const NAV_LIST = [
  {
    href: '/discover?genreIds=1&condition=SINGLE',
    title: 'ジャンル',
  },
  { href: '/ranking', title: 'ランキング' },
  { href: '/special-features', title: '特集' },
  { href: '/settings', title: '設定' },
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
          <li key={item.href}>
            <NavigateLink
              className={cn(
                location.pathname !== '/' &&
                  item.href.includes(location.pathname) &&
                  'text-primary'
              )}
              href={item.href}
              onClick={onClick}
            >
              {item.title}
            </NavigateLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
