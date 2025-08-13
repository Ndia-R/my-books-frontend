import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { deleteBookmark, updateBookmark } from '@/lib/api/bookmarks';
import { getUserBookmarks } from '@/lib/api/user';
import { chapterNumberString, cn, formatDateJP, formatTime } from '@/lib/utils';
import { Bookmark, BookmarkRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkItem({ bookmark }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { page, updateQueryParams } = useSearchFilters();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({
      bookmarkId,
      requestBody,
    }: {
      bookmarkId: number;
      requestBody: BookmarkRequest;
    }) => updateBookmark(bookmarkId, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.bookmarks(page),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onSuccess: async () => {
      // ２ページ以降で、そのページの最後の１つを削除した場合は、１ページ戻る
      const bookmarkPage = await getUserBookmarks(page);
      if (page >= 2 && bookmarkPage.data.length === 0) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.bookmarks(page - 1),
        });
        updateQueryParams({ page: page - 1 });
        return;
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.bookmarks(page),
      });
    },
  });

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex gap-x-4 p-4">
            <div className="flex min-w-20 justify-center sm:min-w-24">
              <Link
                to={`/read/${bookmark.book.id}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                className="size-fit"
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
                    to={`/read/${bookmark.book.id}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                    className="size-fit"
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

                <div className="flex items-center">
                  <time
                    className="text-muted-foreground mr-1 flex gap-x-1 text-sm"
                    dateTime={
                      Date.parse(bookmark.createdAt) ? bookmark.createdAt : ''
                    }
                  >
                    <span>{formatDateJP(bookmark.createdAt)}</span>
                    <span>{formatTime(bookmark.createdAt)}</span>
                  </time>
                </div>
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
