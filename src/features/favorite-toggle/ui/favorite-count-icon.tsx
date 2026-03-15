import { bookQueryKeys, getBookFavoriteStats } from '@/entities/book';
import {
  createFavorite,
  deleteFavoriteByBookId,
  favoriteQueryKeys,
  isFavoritedByUser,
} from '@/entities/favorite';
import { useAuth } from '@/entities/user';
import { TOAST_ERROR_DURATION } from '@/shared/config/constants';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

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

  // 最新の楽観的更新状態を保持するref（debounce内で参照するため）
  const latestOptimisticRef = useRef<FavoriteStatus | null>(null);
  // 元のお気に入り状態を保持するref（debounce内で比較するため）
  const originalFavoriteRef = useRef<boolean>(false);

  // お気に入り状態を取得（認証済みの場合のみ）
  const { data: isFavorite = false, isLoading: isFavoriteLoading } = useQuery({
    queryKey: favoriteQueryKeys.isFavoritedByUser(bookId),
    queryFn: () => isFavoritedByUser(bookId),
    enabled: isAuthenticated,
  });

  // お気に入り数を取得
  const { data: favoriteStats, isLoading: favoriteStatsLoading } = useQuery({
    queryKey: bookQueryKeys.getBookFavoriteStats(bookId),
    queryFn: () => getBookFavoriteStats(bookId),
  });

  // 楽観的更新中はoptimisticUpdateを、それ以外はAPIから取得した値を使用
  const displayState: FavoriteStatus = optimisticUpdate ?? {
    isFavorite,
    count: favoriteStats?.favoriteCount ?? 0,
  };

  // isFavoriteの値をrefに同期（debounce内で最新の値を参照するため）
  useEffect(() => {
    originalFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  // debounceされたAPIリクエスト（連打時は最後のリクエストのみ実行）
  const debouncedApiRequest = useDebouncedCallback(async () => {
    const targetState = latestOptimisticRef.current;
    if (!targetState) return;

    // 元の状態と同じ場合はAPIリクエストをスキップ（往復クリックで戻った場合）
    if (targetState.isFavorite === originalFavoriteRef.current) {
      setOptimisticUpdate(null);
      latestOptimisticRef.current = null;
      return;
    }

    try {
      if (targetState.isFavorite) {
        // 楽観的更新が「お気に入り済み」→ 追加リクエスト
        await createFavorite({ bookId });
      } else {
        // 楽観的更新が「お気に入りでない」→ 削除リクエスト
        await deleteFavoriteByBookId(bookId);
      }

      // API成功後にキャッシュを無効化
      await queryClient.invalidateQueries({
        queryKey: favoriteQueryKeys.isFavoritedByUser(bookId),
      });
      await queryClient.invalidateQueries({
        queryKey: bookQueryKeys.getBookFavoriteStats(bookId),
      });
      await queryClient.invalidateQueries({
        queryKey: favoriteQueryKeys.getUserFavoritesInfinite(),
      });
      // すべてのリフェッチ完了後に楽観的更新をクリア
      setOptimisticUpdate(null);
      latestOptimisticRef.current = null;
    } catch {
      // エラー時は楽観的更新をクリア
      setOptimisticUpdate(null);
      latestOptimisticRef.current = null;
      toast.error('お気に入りの更新に失敗しました', {
        duration: TOAST_ERROR_DURATION,
      });
    }
  }, 300);

  // コンポーネントのアンマウント時にdebounceをキャンセル
  useEffect(() => {
    return () => {
      debouncedApiRequest.cancel();
    };
  }, [debouncedApiRequest]);

  const handleClick = () => {
    if (!isAuthenticated) return;

    // 楽観的更新を設定
    const newState: FavoriteStatus = {
      isFavorite: !displayState.isFavorite,
      count: displayState.count + (displayState.isFavorite ? -1 : 1),
    };
    setOptimisticUpdate(newState);
    latestOptimisticRef.current = newState;

    // お気に入り追加時のみアニメーションキーを更新
    if (!displayState.isFavorite) {
      setAnimationKey((prev) => prev + 1);
    }

    // debounceされたAPIリクエストを呼び出し
    debouncedApiRequest();
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
            : '無料登録してこの本を「お気に入り」に加えましょう'}
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
