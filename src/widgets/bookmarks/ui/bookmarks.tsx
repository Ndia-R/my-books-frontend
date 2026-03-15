import { usePrefetchBook } from '@/entities/book';
import {
  BookmarkList,
  bookmarkQueryKeys,
  deleteBookmark,
  getUserBookmarks,
  updateBookmark,
  type Bookmark,
  type BookmarkPage,
  type BookmarkUpdateParams,
} from '@/entities/bookmark';
import { BookmarkUpdateDialog } from '@/features/bookmark';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { BookmarkIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function BookmarkEditAction({ bookmark }: { bookmark: Bookmark }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: bookmarkQueryKeys.getUserBookmarksInfinite(),
    });
    queryClient.invalidateQueries({
      queryKey: bookmarkQueryKeys.getUserBookmarksByBookId(bookmark.book.id),
    });
  };

  const updateMutation = useMutation({
    mutationFn: ({ bookmarkId, requestBody }: BookmarkUpdateParams) =>
      updateBookmark(bookmarkId, requestBody),
    onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onSuccess,
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'text-muted-foreground hover:text-primary size-8',
              bookmark && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            aria-label="ブックマーク"
            onClick={() => setIsOpen(true)}
          >
            <BookmarkIcon className={cn(bookmark && 'fill-primary')} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>ブックマークを編集</TooltipContent>
      </Tooltip>

      <BookmarkUpdateDialog
        bookmark={bookmark}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </>
  );
}

export default function Bookmarks() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: bookmarkQueryKeys.getUserBookmarksInfinite(),
      queryFn: ({ pageParam }) => getUserBookmarks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: BookmarkPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const bookmarks = data.pages.flatMap((page) => page.data);

  const { prefetchBookReadContent } = usePrefetchBook();

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

      <BookmarkList
        bookmarks={bookmarks}
        onItemPrefetch={(bookmark) =>
          prefetchBookReadContent(
            bookmark.book.id,
            bookmark.chapterNumber,
            bookmark.pageNumber
          )
        }
        renderAction={(bookmark) => <BookmarkEditAction bookmark={bookmark} />}
      />

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
