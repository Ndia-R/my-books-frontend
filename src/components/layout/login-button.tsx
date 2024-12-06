import { useAuth } from '@/auth/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MENU_LIST } from '@/constants/constants';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogin = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  };

  const handleClickLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/login', { state: { from: location } });
  };

  const handleClickItem = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <>
      {user ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="ml-2 flex items-center justify-center" asChild>
            <Button className="rounded-full" size="icon">
              <Avatar>
                <AvatarImage
                  className="bg-primary"
                  src={user.avatarUrl}
                  alt="avatar-image"
                />
                <AvatarFallback className="font-semibold">
                  {user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 p-2" side="bottom">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MENU_LIST.map((item) => (
              <DropdownMenuItem
                onClick={() => handleClickItem(item.href)}
                key={item.href}
              >
                {item.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickLogout}>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="rounded-full" variant="ghost" onClick={handleClickLogin}>
          ログイン
        </Button>
      )}
    </>
  );
}
