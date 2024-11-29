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
    <ul className="flex flex-col gap-x-0 gap-y-2 md:flex-row">
      {MENU_LIST.map((item) => (
        <li key={item.href}>
          <Link to={item.href}>
            <Button
              className={cn(
                'rounded-full w-full justify-center hover:bg-primary/20 hover:text-primary text-muted-foreground',
                pathname === item.href && 'text-primary underline hover:text-primary'
              )}
              variant="ghost"
              onClick={onClick}
            >
              {item.title}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
