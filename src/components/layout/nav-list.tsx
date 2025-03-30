import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router';

const NAV_LIST = [
  {
    href: '/discover?genreIds=1&condition=SINGLE',
    title: 'ジャンル',
  },
  { href: '/ranking', title: 'ランキング' },
  { href: '/special-features', title: '特集' },
];

type Props = {
  onClick?: () => void;
};

export default function NavList({ onClick }: Props) {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex flex-col gap-y-2 lg:flex-row">
        {NAV_LIST.map((item) => (
          <li className="w-full" key={item.href}>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'hover:text-foreground/50 w-full rounded-full hover:bg-transparent',
                location.pathname !== '/' &&
                  item.href.includes(location.pathname) &&
                  'text-primary'
              )}
              to={item.href}
              onClick={onClick}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
