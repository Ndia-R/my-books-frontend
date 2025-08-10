import FavoriteList from '@/components/favorites/favorite-list';
import { queryKeys } from '@/constants/query-keys';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getUserFavorites } from '@/lib/api/user';
import { Favorite } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Favorites() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: initialFavoritePage } = useSuspenseQuery({
    queryKey: queryKeys.user.favorites(1),
    queryFn: () => getUserFavorites(1),
  });

  useEffect(() => {
    if (initialFavoritePage) {
      setCurrentPage(1);
      setFavorites(initialFavoritePage.data);
      setTotalPages(initialFavoritePage.totalPages);
    }
  }, [initialFavoritePage]);

  const loadMoreFavorites = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const nextFavoritePage = await getUserFavorites(nextPage);
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        ...nextFavoritePage.data,
      ]);
      setCurrentPage(nextPage);
    } catch {
      toast.error('お気に入りの読み込みに失敗しました', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, isLoading]);

  // 無限スクロール用のトリガー要素のref
  const triggerRef = useIntersectionObserver(
    loadMoreFavorites,
    currentPage < totalPages && !isLoading
  );

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {initialFavoritePage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <FavoriteList favorites={favorites} />

      {currentPage < totalPages && (
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
