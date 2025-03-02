import { Button } from '@/components/ui/button';
import { MENU_LIST } from '@/constants/constants';
import { cn } from '@/lib/util';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  onClick?: () => void;
};

export default function MenuList({ onClick }: Props) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <ul className="flex flex-col gap-x-0 gap-y-2 lg:flex-row">
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
