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
import { useAuth } from '@/hooks/use-auth';
import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogin = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    }
  };

  const handleClickLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
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
            <Button className="rounded-full" variant="ghost" size="icon">
              <Avatar>
                <AvatarImage
                  className="bg-primary/50"
                  src={user.avatarUrl}
                  alt="avatar-image"
                />
                <AvatarFallback className="text-lg font-semibold">
                  {user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-2" side="bottom" align="end">
            <DropdownMenuLabel>
              <div className="flex items-center gap-x-2">
                <Avatar className="size-8">
                  <AvatarImage
                    className="bg-primary/50"
                    src={user.avatarUrl}
                    alt="avatar-image"
                  />
                  <AvatarFallback className="font-semibold">
                    {user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate">{user.name}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MENU_LIST.map((item) => (
              <DropdownMenuItem
                onClick={() => handleClickItem(item.href)}
                key={item.href}
              >
                <item.icon className="mr-1" />
                {item.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickLogout}>
              <LogOutIcon className="mr-1" />
              ログアウト
            </DropdownMenuItem>
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
