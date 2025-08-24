import BookmarkList from '@/components/bookmarks/bookmark-list';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getUserBookmarks } from '@/lib/api/user';
import { Bookmark } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function Bookmarks() {
  const { data: firstPage } = useSuspenseQuery({
    queryKey: queryKeys.getUserBookmarks(1),
    queryFn: () => getUserBookmarks(1),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(firstPage.data);
  const [currentPage, setCurrentPage] = useState(firstPage.currentPage);
  const [hasNext, setHasNext] = useState(firstPage.hasNext);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    try {
      const newPage = await getUserBookmarks(currentPage + 1);
      setBookmarks((prevBookmarks) => [...prevBookmarks, ...newPage.data]);
      setCurrentPage(newPage.currentPage);
      setHasNext(newPage.hasNext);
    } catch {
      toast.error('ブックマークの読み込みに失敗しました', {
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

      <BookmarkList bookmarks={bookmarks} />

      {hasNext && (
        <div ref={triggerRef} className="flex h-16 items-center justify-center">
          {isLoading && (
            <Loader2Icon
              className="text-muted-foreground animate-spin"
              aria-label="ブックマークを読み込み中"
              role="status"
            />
          )}
        </div>
      )}
    </div>
  );
}
