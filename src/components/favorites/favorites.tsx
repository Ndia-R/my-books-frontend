import FavoriteList from '@/components/favorites/favorite-list';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getUserFavorites } from '@/lib/api/user';
import { Favorite } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function Favorites() {
  const { data: firstPage } = useSuspenseQuery({
    queryKey: queryKeys.getUserFavorites(1),
    queryFn: () => getUserFavorites(1),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const [favorites, setFavorites] = useState<Favorite[]>(firstPage.data);
  const [currentPage, setCurrentPage] = useState(firstPage.currentPage);
  const [hasNext, setHasNext] = useState(firstPage.hasNext);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    try {
      const newPage = await getUserFavorites(currentPage + 1);
      setFavorites((prevFavorites) => [...prevFavorites, ...newPage.data]);
      setCurrentPage(newPage.currentPage);
      setHasNext(newPage.hasNext);
    } catch {
      toast.error('お気に入りの読み込みに失敗しました', {
        duration: TOAST_ERROR_DURATION,
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNext, isLoading]);

  // 無限スクロール用のトリガー要素のref
  const triggerRef = useIntersectionObserver(loadMore, hasNext && !isLoading);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6 space-x-1 text-right">
        <span className="text-lg font-semibold sm:text-xl">
          {firstPage.totalItems}
        </span>
        <span className="text-muted-foreground text-sm">件</span>
      </p>

      <FavoriteList favorites={favorites} />

      {hasNext && (
        <div ref={triggerRef} className="flex h-16 items-center justify-center">
          {isLoading && (
            <Loader2Icon
              className="text-muted-foreground animate-spin"
              aria-label="お気に入りを読み込み中"
              role="status"
            />
          )}
        </div>
      )}
    </div>
  );
}
