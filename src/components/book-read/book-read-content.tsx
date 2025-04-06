import BookmarkCreateDialog from '@/components/bookmarks/bookmark-create-dialog';
import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import { usePageTitle } from '@/hooks/use-page-title';
import {
  getCurrentPageText,
  getPageLink,
  getPagePosition,
} from '@/lib/book-read-content';
import { cn } from '@/lib/utils';
import { Bookmark, BookmarkRequest } from '@/types';
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TableOfContentsIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookReadContent({
  bookId,
  chapterNumber,
  pageNumber,
}: Props) {
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

  const { getBookTableOfContents, getBookContentPage } = useApiBook();
  const {
    getBookmarkByBookId,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  } = useApiBookmark();

  const [
    { data: bookTableOfContents },
    { data: bookContentPage },
    { data: bookmark },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['getBookTableOfContents', bookId],
        queryFn: () => getBookTableOfContents(bookId),
      },
      {
        queryKey: ['getBookContentPage', bookId, chapterNumber, pageNumber],
        queryFn: () => getBookContentPage(bookId, chapterNumber, pageNumber),
      },
      {
        queryKey: ['getBookmarkByBookId', bookId],
        queryFn: () => getBookmarkByBookId(bookId),
        select: (bookmarks: Bookmark[]) =>
          bookmarks.find(
            (bookmark) =>
              bookmark.bookId === bookId &&
              bookmark.chapterNumber === chapterNumber &&
              bookmark.pageNumber === pageNumber
          ),
      },
    ],
  });

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['getBookmarkByBookId', bookId],
    });
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const createMutation = useMutation({
    mutationFn: (requestBody: BookmarkRequest) => createBookmark(requestBody),
    onSuccess,
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: number;
      requestBody: BookmarkRequest;
    }) => updateBookmark(id, requestBody),
    onSuccess,
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onSuccess,
    onError,
  });

  const currentPageText = getCurrentPageText(
    bookTableOfContents,
    chapterNumber,
    pageNumber
  );

  const { isFirstPage, isLastPage } = getPagePosition(
    bookTableOfContents,
    chapterNumber,
    pageNumber
  );

  const nextPageLink = getPageLink(
    bookTableOfContents,
    chapterNumber,
    pageNumber,
    'next'
  );

  const prevPageLink = getPageLink(
    bookTableOfContents,
    chapterNumber,
    pageNumber,
    'prev'
  );

  usePageTitle(`${bookContentPage.chapterTitle} (${currentPageText})`);

  return (
    <>
      <div className="animate-in fade-in-0 delay-0 duration-200">
        <div className="flex flex-col gap-y-12 px-4 pt-12 pb-6 sm:px-20">
          <div>
            <p className="text-muted-foreground mb-2 text-xs sm:text-sm">{`第 ${bookContentPage.chapterNumber} 章`}</p>
            <div className="flex flex-wrap items-center">
              <h1 className="text-xl font-bold text-wrap sm:text-2xl">
                {bookContentPage.chapterTitle}
              </h1>
              <p className="text-muted-foreground mr-2 ml-4 text-xs sm:text-sm">
                {currentPageText}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'rounded-full'
                    )}
                    to={`/read/${bookId}/table-of-contents`}
                    aria-label="目次に戻る"
                  >
                    <TableOfContentsIcon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>目次に戻る</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={cn(
                      'text-muted-foreground size-8 rounded-full',
                      bookmark && 'text-primary bg-transparent'
                    )}
                    variant="ghost"
                    size="icon"
                    aria-label="ブックマーク"
                    onClick={
                      bookmark
                        ? () => setIsOpenUpdateDialog(true)
                        : () => setIsOpenCreateDialog(true)
                    }
                  >
                    <BookmarkIcon
                      className={cn('size-4', bookmark && 'fill-primary')}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {bookmark
                    ? bookmark.note
                      ? `メモ「${bookmark.note}」`
                      : 'ブックマークからから削除'
                    : 'ブックマークに追加'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <p className="whitespace-pre-wrap">{bookContentPage.content}</p>
        </div>
        <div className="flex justify-between px-0 py-6 sm:px-12">
          <Button
            className={cn(
              'flex items-center gap-x-2 rounded-full hover:bg-transparent',
              isFirstPage && 'text-muted-foreground pointer-events-none'
            )}
            variant="ghost"
            asChild
          >
            <Link to={prevPageLink}>
              <ChevronLeftIcon />
              <span>前のページへ</span>
            </Link>
          </Button>
          <Button
            className={cn(
              'flex items-center gap-x-2 rounded-full hover:bg-transparent',
              isLastPage && 'text-muted-foreground pointer-events-none'
            )}
            variant="ghost"
            asChild
          >
            <Link to={nextPageLink}>
              <span>次のページへ</span>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
      </div>

      {bookmark && (
        <BookmarkUpdateDialog
          bookmark={bookmark}
          isOpen={isOpenUpdateDialog}
          setIsOpen={setIsOpenUpdateDialog}
          updateMutation={updateMutation}
          deleteMutation={deleteMutation}
        />
      )}

      <BookmarkCreateDialog
        bookId={bookId}
        chapterNumber={chapterNumber}
        pageNumber={pageNumber}
        isOpen={isOpenCreateDialog}
        setIsOpen={setIsOpenCreateDialog}
        createMutation={createMutation}
      />
    </>
  );
}
