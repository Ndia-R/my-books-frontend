import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { createFavorite, deleteFavorite } from '@/lib/api/favorite';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { HeartIcon } from 'lucide-react';
import { startTransition, useEffect, useOptimistic, useState } from 'react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type FavoriteStatus = {
  isFavorite: boolean;
  count: number;
};

type Props = {
  bookId: string;
  isFavorite: boolean;
  count: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
};

export default function FavoriteCountIcon({
  bookId,
  isFavorite,
  count,
  size = 'md',
  showCount = false,
}: Props) {
  const { isAuthenticated } = useAuth();

  const [favoriteState, setFavoriteState] = useState<FavoriteStatus>({
    isFavorite,
    count,
  });

  const [optimisticState, addOptimistic] = useOptimistic(
    favoriteState,
    (_currentState, newState: FavoriteStatus) => {
      return newState;
    }
  );

  useEffect(() => {
    setFavoriteState({ isFavorite, count });
  }, [count, isFavorite]);

  const handleClick = () => {
    if (!isAuthenticated) return;

    const newFavoriteState = {
      isFavorite: !optimisticState.isFavorite,
      count: optimisticState.count + (optimisticState.isFavorite ? -1 : 1),
    };

    startTransition(async () => {
      // 楽観的更新を行う
      addOptimistic(newFavoriteState);
      // APIリクエストを送信する
      try {
        if (favoriteState.isFavorite) {
          await deleteFavorite(bookId);
        } else {
          await createFavorite({ bookId });
        }
        // APIリクエストが成功した場合のみ真の状態を更新する
        setFavoriteState(newFavoriteState);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="text-muted-foreground flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'text-muted-foreground rounded-full',
              BUTTON_SIZE[size],
              optimisticState.isFavorite && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            aria-label={
              optimisticState.isFavorite
                ? 'お気に入りから削除'
                : 'お気に入りに追加'
            }
            onClick={handleClick}
          >
            <HeartIcon
              className={cn(
                ICON_SIZE[size],
                optimisticState.isFavorite && 'fill-primary'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isAuthenticated
            ? optimisticState.isFavorite
              ? 'お気に入りから削除'
              : 'お気に入りに追加'
            : 'ログインしてこの本を「お気に入り」に加えましょう'}
        </TooltipContent>
      </Tooltip>

      {showCount && (
        <div className={cn('flex min-w-4 justify-center', TEXT_SIZE[size])}>
          {optimisticState.count}
        </div>
      )}
    </div>
  );
}
