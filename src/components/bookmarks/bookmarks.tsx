import BookmarkList from '@/components/bookmarks/bookmark-list';
import { queryKeys } from '@/constants/query-keys';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getUserBookmarks } from '@/lib/api/user';
import { Bookmark } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Bookmarks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: initialBookmarkPage } = useSuspenseQuery({
    queryKey: queryKeys.user.bookmarks(1),
    queryFn: () => getUserBookmarks(1),
  });

  useEffect(() => {
    if (initialBookmarkPage) {
      setCurrentPage(1);
      setBookmarks(initialBookmarkPage.data);
      setTotalPages(initialBookmarkPage.totalPages);
    }
  }, [initialBookmarkPage]);

  const loadMoreBookmarks = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const nextBookmarkPage = await getUserBookmarks(nextPage);
      setBookmarks((prevBookmarks) => [
        ...prevBookmarks,
        ...nextBookmarkPage.data,
      ]);
      setCurrentPage(nextPage);
    } catch {
      toast.error('ブックマークの読み込みに失敗しました', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, isLoading]);

  // 無限スクロール用のトリガー要素のref
  const triggerRef = useIntersectionObserver(
    loadMoreBookmarks,
    currentPage < totalPages && !isLoading
  );

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {initialBookmarkPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookmarkList bookmarks={bookmarks} />

      {currentPage < totalPages && (
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
