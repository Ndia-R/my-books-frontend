import BookmarkUpdateDialog from '@/features/bookmark/ui/bookmark-update-dialog';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import { BOOK_IMAGE_BASE_URL } from '@/shared/config/constants';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { deleteBookmark, updateBookmark } from '@/entities/bookmark/api/bookmarks';
import {
  chapterNumberString,
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { buildPath } from '@/shared/api/url-builder';
import { cn } from '@/shared/lib/utils';
import type { Bookmark, BookmarkUpdateParams } from '@/entities/bookmark/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkItem({ bookmark }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.getUserBookmarksInfinite(),
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.getUserBookmarksByBookId(bookmark.book.id),
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

  const { prefetchBookReadContent } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookReadContent(
      bookmark.book.id,
      bookmark.chapterNumber,
      bookmark.pageNumber
    );
  };

  const bookReadPath = buildPath(
    '/read-content/:bookId/chapter/:chapterNumber/page/:pageNumber',
    {
      bookId: bookmark.book.id,
      chapterNumber: bookmark.chapterNumber,
      pageNumber: bookmark.pageNumber,
    }
  );

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex gap-x-4 p-4">
            <div className="flex min-w-20 justify-center sm:min-w-24">
              <Link
                className="size-fit"
                to={bookReadPath}
                aria-label={`${bookmark.book.title}のブックマークページへ移動`}
                onMouseEnter={handlePrefetch}
                onFocus={handlePrefetch}
              >
                <img
                  className="h-24 rounded-xs object-cover sm:h-28"
                  src={BOOK_IMAGE_BASE_URL + bookmark.book.imagePath}
                  alt={bookmark.book.title}
                />
              </Link>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-x-2">
                  <Link
                    className="size-fit"
                    to={bookReadPath}
                    aria-label={`${bookmark.book.title}のブックマークページへ移動`}
                    onMouseEnter={handlePrefetch}
                    onFocus={handlePrefetch}
                  >
                    <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                      {bookmark.book.title}
                    </h2>
                  </Link>

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
                        <BookmarkIcon
                          className={cn(bookmark && 'fill-primary')}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>ブックマークを編集</TooltipContent>
                  </Tooltip>
                </div>

                <time
                  className="text-muted-foreground mr-1 text-sm"
                  dateTime={
                    Date.parse(bookmark.updatedAt) ? bookmark.updatedAt : ''
                  }
                  title={`${formatDateJP(bookmark.updatedAt)} ${formatTime(bookmark.updatedAt)}`}
                >
                  {formatRelativeTime(bookmark.updatedAt)}
                </time>
              </div>

              <p className="text-muted-foreground text-sm">
                {`${chapterNumberString(bookmark.chapterNumber)}:${bookmark.chapterTitle}(${bookmark.pageNumber}ページ目)`}
              </p>

              <p className="text-muted-foreground">
                {bookmark.note && <span>{bookmark.note}</span>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
