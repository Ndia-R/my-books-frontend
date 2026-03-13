import BookmarkList from '@/components/bookmarks/bookmark-list';
import { queryKeys } from '@/constants/query-keys';
import { getUserBookmarks } from '@/lib/api/users';
import type { BookmarkPage } from '@/types/bookmark';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Bookmarks() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.getUserBookmarksInfinite(),
      queryFn: ({ pageParam }) => getUserBookmarks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: BookmarkPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const bookmarks = data.pages.flatMap((page) => page.data);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6 space-x-1 text-right">
        <span className="text-lg font-semibold sm:text-xl">{totalItems}</span>
        <span className="text-muted-foreground text-sm">件</span>
      </p>

      <BookmarkList bookmarks={bookmarks} />

      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          {isFetchingNextPage && (
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
