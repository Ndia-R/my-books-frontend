import BookmarkCreateDialog from '@/components/bookmarks/bookmark-create-dialog';
import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { queryKeys } from '@/constants/query-keys';
import {
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from '@/lib/api/bookmarks';
import { cn } from '@/lib/utils';
import {
  BookChapterPageContent,
  Bookmark,
  BookmarkRequest,
  BookmarkUpdateParams,
} from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  bookChapterPageContent: BookChapterPageContent;
  bookmark?: Bookmark;
};

export default function BookReadBookmarkButton({
  bookChapterPageContent,
  bookmark,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { bookId, chapterNumber, pageNumber } = bookChapterPageContent;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.getUserBookmarksByBookId(bookId),
    });
  };

  const createMutation = useMutation({
    mutationFn: (requestBody: BookmarkRequest) => createBookmark(requestBody),
    onSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: ({ bookmarkId, requestBody }: BookmarkUpdateParams) =>
      updateBookmark(bookmarkId, requestBody),
    onSuccess,
  });

  const deleteMutation = useMutation<void, Error, number>({
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
        <TooltipContent>
          {bookmark
            ? bookmark.note
              ? `メモ「${bookmark.note}」`
              : 'ブックマークを編集'
            : 'ブックマークに追加'}
        </TooltipContent>
      </Tooltip>

      {bookmark ? (
        <BookmarkUpdateDialog
          bookmark={bookmark}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateMutation={updateMutation}
          deleteMutation={deleteMutation}
        />
      ) : (
        <BookmarkCreateDialog
          bookId={bookId}
          chapterNumber={chapterNumber}
          pageNumber={pageNumber}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
      )}
    </>
  );
}
