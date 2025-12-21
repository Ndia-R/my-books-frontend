import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { createFavorite, deleteFavoriteByBookId } from '@/lib/api/favorite';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { startTransition, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

type FavoriteStatus = {
  isFavorite: boolean;
  count: number;
};

type Props = {
  bookId: string;
  isFavorite: boolean;
  count: number;
  hideCount?: boolean;
};

export default function FavoriteCountIcon({
  bookId,
  isFavorite,
  count,
  hideCount = false,
}: Props) {
  const { isAuthenticated } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  // propsから直接派生させる
  const favoriteState: FavoriteStatus = {
    isFavorite,
    count,
  };

  const [optimisticState, addOptimistic] = useOptimistic(
    favoriteState,
    (_currentState, newState: FavoriteStatus) => {
      return newState;
    }
  );

  const handleClick = () => {
    if (!isAuthenticated) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

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
          await deleteFavoriteByBookId(bookId);
        } else {
          await createFavorite({ bookId });
        }
        // APIリクエストが成功すれば親コンポーネントが再レンダリングしてpropsが更新される
      } catch {
        toast.error('お気に入りの更新に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      }
    });
  };

  return (
    <div className="text-muted-foreground flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'text-muted-foreground hover:text-primary size-8',
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
            <motion.div
              animate={
                isAnimating
                  ? {
                      scale: optimisticState.isFavorite
                        ? [1, 1.4, 0.8, 1.2, 1]
                        : [1, 1, 1],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <HeartIcon
                className={cn(optimisticState.isFavorite && 'fill-primary')}
              />
            </motion.div>
            <AnimatePresence>
              {isAnimating &&
                optimisticState.isFavorite &&
                [...Array(3)].map((_, i) => {
                  const angles = [-120, -90, -60]; // 角度の配列
                  const angle = angles[i] * (Math.PI / 180); // ラジアンに変換
                  return (
                    <motion.span
                      key={i}
                      className="bg-primary absolute h-2 w-2 rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0, 1],
                        x: 24 * Math.cos(angle),
                        y: 24 * Math.sin(angle),
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                      }}
                    ></motion.span>
                  );
                })}
            </AnimatePresence>
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

      {!hideCount && (
        <div className="flex min-w-4 justify-center text-sm">
          {optimisticState.count}
        </div>
      )}
    </div>
  );
}
