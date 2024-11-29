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
      console.log(location);

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
                    src={user.avatarUrl || '/images/avatar01.png'}
                    alt="avatar-image"
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 p-2" side="bottom">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {MENU_LIST.map((item) => (
                  <Link to={item.href} key={item.href}>
                    <DropdownMenuItem
                      className="my-1 cursor-pointer rounded-full px-4 hover:bg-primary/20 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xs">{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer rounded-full px-4 hover:bg-primary/20 hover:text-primary"
                  onClick={handleClickLogout}
                >
                  <span className="text-xs">ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="ml-2 cursor-pointer" onClick={handleClickAvatar}>
                  <AvatarImage
                    src={user.avatarUrl || '/images/avatar01.png'}
                    alt="avatar-image"
                  />
                  <AvatarFallback>P</AvatarFallback>
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
