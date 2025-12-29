import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { getBookFavoriteStats } from '@/lib/api/books';
import { createFavorite, deleteFavoriteByBookId } from '@/lib/api/favorites';
import { isFavoritedByUser } from '@/lib/api/users';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

type FavoriteStatus = {
  isFavorite: boolean;
  count: number;
};

type Props = {
  bookId: string;
  hideCount?: boolean;
};

export default function FavoriteCountIcon({
  bookId,
  hideCount = false,
}: Props) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [optimisticUpdate, setOptimisticUpdate] =
    useState<FavoriteStatus | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // お気に入り状態を取得（認証済みの場合のみ）
  const { data: isFavorite = false, isLoading: isFavoriteLoading } = useQuery({
    queryKey: queryKeys.isFavoritedByUser(bookId),
    queryFn: () => isFavoritedByUser(bookId),
    enabled: isAuthenticated,
  });

  // お気に入り数を取得
  const { data: favoriteStats, isLoading: favoriteStatsLoading } = useQuery({
    queryKey: queryKeys.getBookFavoriteStats(bookId),
    queryFn: () => getBookFavoriteStats(bookId),
  });

  // 楽観的更新中はoptimisticUpdateを、それ以外はAPIから取得した値を使用
  const displayState: FavoriteStatus = optimisticUpdate ?? {
    isFavorite,
    count: favoriteStats?.favoriteCount ?? 0,
  };

  const handleClick = async () => {
    if (!isAuthenticated) return;

    // 楽観的更新を設定
    const newState: FavoriteStatus = {
      isFavorite: !displayState.isFavorite,
      count: displayState.count + (displayState.isFavorite ? -1 : 1),
    };
    setOptimisticUpdate(newState);

    // お気に入り追加時のみアニメーションキーを更新
    if (!displayState.isFavorite) {
      setAnimationKey((prev) => prev + 1);
    }

    // APIリクエストを送信する
    try {
      if (displayState.isFavorite) {
        await deleteFavoriteByBookId(bookId);
      } else {
        await createFavorite({ bookId });
      }

      // API成功後にキャッシュを無効化
      await queryClient.invalidateQueries({
        queryKey: queryKeys.isFavoritedByUser(bookId),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getBookFavoriteStats(bookId),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getUserFavoritesInfinite(),
      });
      // すべてのリフェッチ完了後に楽観的更新をクリア
      setOptimisticUpdate(null);
    } catch {
      // エラー時は楽観的更新をクリア
      setOptimisticUpdate(null);
      toast.error('お気に入りの更新に失敗しました', {
        duration: TOAST_ERROR_DURATION,
      });
    }
  };

  if (favoriteStatsLoading || isFavoriteLoading) {
    return (
      <div className="text-muted-foreground flex items-center">
        <div className="bg-muted size-8 animate-pulse rounded" />
        {!hideCount && (
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />
        )}
      </div>
    );
  }

  return (
    <div className="text-muted-foreground flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'text-muted-foreground hover:text-primary size-8',
              displayState.isFavorite && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            aria-label={
              displayState.isFavorite
                ? 'お気に入りから削除'
                : 'お気に入りに追加'
            }
            onClick={handleClick}
          >
            <motion.div
              key={`heart-${animationKey}`}
              initial={{ scale: 1 }}
              animate={{
                scale:
                  animationKey > 0 && displayState.isFavorite
                    ? [1, 1.4, 0.8, 1.2, 1]
                    : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <HeartIcon
                className={cn(displayState.isFavorite && 'fill-primary')}
              />
            </motion.div>
            <AnimatePresence mode="popLayout">
              {animationKey > 0 &&
                displayState.isFavorite &&
                Array.from({ length: 3 }, (_, i) => {
                  const angles = [-120, -90, -60]; // 角度の配列
                  const angle = angles[i] * (Math.PI / 180); // ラジアンに変換
                  return (
                    <motion.span
                      key={`particle-${animationKey}-${i}`}
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
            ? displayState.isFavorite
              ? 'お気に入りから削除'
              : 'お気に入りに追加'
            : 'ログインしてこの本を「お気に入り」に加えましょう'}
        </TooltipContent>
      </Tooltip>

      {!hideCount && (
        <div className="flex min-w-4 justify-center text-sm">
          {displayState.count}
        </div>
      )}
    </div>
  );
}
