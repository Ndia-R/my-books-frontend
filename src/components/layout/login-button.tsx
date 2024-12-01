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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MENU_LIST } from '@/constants/constants';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickAvatar = () => {
    setIsOpen(true);
  };

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

  return (
    <>
      {user ? (
        <>
          {isOpen ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-2 cursor-pointer">
                  <AvatarImage
                    className="bg-primary"
                    src={user.avatarUrl}
                    alt="avatar-image"
                  />
                  <AvatarFallback className="font-semibold">
                    {user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 p-2" side="bottom">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {MENU_LIST.map((item) => (
                  <Link to={item.href} key={item.href}>
                    <DropdownMenuItem onClick={() => setIsOpen(false)}>
                      {item.title}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClickLogout}>
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="ml-2 cursor-pointer" onClick={handleClickAvatar}>
                  <AvatarImage
                    className="bg-primary"
                    src={user.avatarUrl}
                    alt="avatar-image"
                  />
                  <AvatarFallback className="font-semibold">
                    {user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom">プロフィールと一般設定</TooltipContent>
            </Tooltip>
          )}
        </>
      ) : (
        <Button className="rounded-full" variant="ghost" onClick={handleClickLogin}>
          ログイン
        </Button>
      )}
    </>
  );
}
