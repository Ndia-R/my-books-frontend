import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router';

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
            <Button variant="link" asChild>
              <Link
                className={cn(
                  'w-full',
                  location.pathname !== '/' &&
                    item.href.includes(location.pathname) &&
                    'text-primary'
                )}
                to={item.href}
                onClick={onClick}
              >
                <span>{item.title}</span>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
