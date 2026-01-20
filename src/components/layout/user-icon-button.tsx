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
import { AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { RoleType } from '@/constants/roles';
import usePrefetch from '@/hooks/use-prefetch';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import type { MenuItem } from '@/types';
import {
  BookmarkIcon,
  HeartIcon,
  LogOutIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function UserIconButton() {
  const { logout, userProfile, hasAnyRole } = useAuth();

  const MENU_LIST: MenuItem[] = [
    { label: 'プロフィール', href: '/profile', icon: UserRoundIcon },
    { label: 'お気に入り', href: '/favorites', icon: HeartIcon },
  ];

  // プレミアムユーザーとアドミンユーザーはリスト項目追加
  if (hasAnyRole([RoleType.PremiumUser, RoleType.Admin])) {
    MENU_LIST.push({
      label: 'ブックマーク',
      href: '/bookmarks',
      icon: BookmarkIcon,
    });
    MENU_LIST.push({
      label: 'マイレビュー',
      href: '/my-reviews',
      icon: MessageSquareIcon,
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickLogout = () => {
    logout();
  };

  const handleClickMenuItem = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  const {
    prefetchUserProfile,
    prefetchUserFavoritesInfinite,
    prefetchUserBookmarksInfinite,
    prefetchUserReviewsInfinite,
  } = usePrefetch();

  const handlePrefetch = async (href: string) => {
    switch (href) {
      case '/profile':
        await prefetchUserProfile();
        break;
      case '/favorites':
        await prefetchUserFavoritesInfinite();
        break;
      case '/bookmarks':
        await prefetchUserBookmarksInfinite();
        break;
      case '/my-reviews':
        await prefetchUserReviewsInfinite();
        break;
      default:
        break;
    }
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
              src={AVATAR_IMAGE_BASE_URL + userProfile?.avatarPath}
              alt="avatar-image"
            />
            <AvatarFallback className="text-lg font-semibold">
              {userProfile?.displayName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 px-4" side="bottom" align="end">
        <DropdownMenuLabel className="px-0">
          <div className="flex items-center gap-x-2">
            <Avatar className="size-8">
              <AvatarImage
                className="bg-foreground/20"
                src={AVATAR_IMAGE_BASE_URL + userProfile?.avatarPath}
                alt="avatar-image"
              />
              <AvatarFallback className="font-semibold">
                {userProfile?.displayName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-semibold">
                {userProfile?.displayName}
              </p>
              <p className="text-muted-foreground truncate text-sm font-normal">
                {userProfile?.email}
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
            onMouseEnter={() => handlePrefetch(item.href)}
            onFocus={() => handlePrefetch(item.href)}
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
