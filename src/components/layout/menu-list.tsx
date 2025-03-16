import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Link, useLocation } from 'react-router-dom';

const MENU_LIST = [
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

export default function MenuList({ onClick }: Props) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <ul className="flex flex-col gap-y-2 lg:flex-row">
      {MENU_LIST.map((item) => (
        <li className="w-full" key={item.href}>
          <Button
            className={cn(
              'rounded-full w-full hover:bg-transparent hover:text-foreground/50',
              pathname !== '/' && item.href.includes(pathname) && 'text-primary'
            )}
            variant="ghost"
            asChild
          >
            <Link to={item.href} onClick={onClick}>
              {item.title}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
