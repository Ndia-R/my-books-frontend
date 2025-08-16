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
import {
  AVATAR_IMAGE_BASE_URL,
  TOAST_ERROR_DURATION,
} from '@/constants/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useUser } from '@/providers/user-provider';
import { MenuItem } from '@/types';
import { useMutation } from '@tanstack/react-query';
import {
  BookmarkIcon,
  HeartIcon,
  LogOutIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const MENU_LIST: MenuItem[] = [
  { label: 'お気に入り', href: '/favorites', icon: HeartIcon },
  { label: 'ブックマーク', href: '/bookmarks', icon: BookmarkIcon },
  { label: 'マイレビュー', href: '/my-reviews', icon: MessageSquareIcon },
  { label: 'プロフィール', href: '/profile', icon: UserRoundIcon },
];

export default function UserIconButton() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { logout } = useAuth();
  const { user } = useUser();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  const handleClickLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('ログアウトしました');
      },
      onError: () => {
        toast.error('ログアウトに失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });
  };

  const handleClickMenuItem = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center justify-center" asChild>
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          aria-label="アバター画像"
        >
          <Avatar>
            <AvatarImage
              className="bg-foreground/20"
              src={AVATAR_IMAGE_BASE_URL + user?.avatarPath}
              alt="avatar-image"
            />
            <AvatarFallback className="text-lg font-semibold">
              {user?.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 px-4" side="bottom" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-x-2">
            <Avatar className="size-8">
              <AvatarImage
                className="bg-foreground/20"
                src={AVATAR_IMAGE_BASE_URL + user?.avatarPath}
                alt="avatar-image"
              />
              <AvatarFallback className="font-semibold">
                {user?.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="text-muted-foreground truncate text-sm font-normal">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MENU_LIST.map((item) => (
          <DropdownMenuItem
            className={cn(
              location.pathname !== '/' &&
                item.href.includes(location.pathname) &&
                'text-primary'
            )}
            key={item.label}
            onClick={() => handleClickMenuItem(item.href)}
          >
            <item.icon className="mr-1" />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClickLogout}>
          <LogOutIcon className="mr-1" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
