import Button from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  onClick?: () => void;
};

export default function MenuList({ onClick }: Props) {
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { href: '/favorites', title: 'FAVORITES' },
    { href: '/settings', title: 'SETTINGS' },
  ];

  return (
    <ul className="flex flex-col gap-x-0 gap-y-2 md:flex-row">
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link to={item.href}>
            <Button
              className={cn(
                'w-full justify-center hover:bg-primary/20 hover:text-primary text-muted-foreground',
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
