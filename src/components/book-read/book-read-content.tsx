import BookmarkButton from '@/components/book-read/bookmark-button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import {
  getCurrentPageText,
  getPageLink,
  getPagePosition,
} from '@/lib/book-read-content';
import { cn } from '@/lib/util';
import { Bookmark } from '@/types';
import { useSuspenseQueries } from '@tanstack/react-query';
import { ChevronLeftIcon, ChevronRightIcon, TableOfContentsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookReadContent({ bookId, chapterNumber, pageNumber }: Props) {
  const { getBookTableOfContents, getBookContentPage } = useApiBook();
  const { getBookmarkByBookId } = useApiBookmark();

  const [{ data: bookTableOfContents }, { data: bookContentPage }, { data: bookmark }] =
    useSuspenseQueries({
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

  return (
    <div className="delay-0 duration-200 animate-in fade-in-0">
      <div className="flex flex-col gap-y-12 px-4 pb-6 pt-12 sm:px-20">
        <div className="flex flex-col items-start justify-center gap-x-2">
          <p className="mb-2 text-xs text-muted-foreground/70 sm:text-sm">{`chapter ${bookContentPage.chapterNumber}`}</p>
          <div className="text-xl font-bold sm:text-2xl">
            {bookContentPage.chapterTitle}
            <span className="ml-4 mr-2 text-sm text-muted-foreground sm:text-base">
              {currentPageText}
            </span>
            <div className="inline-block">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="size-8 rounded-full"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link
                      to={`/read/${bookId}/table-of-contents`}
                      className="flex items-center gap-x-2"
                    >
                      <TableOfContentsIcon className="size-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>目次に戻る</TooltipContent>
              </Tooltip>
            </div>
            <div className="inline-block">
              <Tooltip>
                <TooltipTrigger asChild>
                  <BookmarkButton
                    bookmark={bookmark}
                    bookId={bookId}
                    chapterNumber={chapterNumber}
                    pageNumber={pageNumber}
                  />
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
        </div>
        <p className="whitespace-pre-wrap">{bookContentPage.content}</p>
      </div>
      <div className="flex justify-between px-0 py-6 sm:px-12">
        <Button
          className={cn(
            'flex items-center gap-x-2 rounded-full hover:bg-transparent',
            isFirstPage && 'pointer-events-none opacity-30'
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
            isLastPage && 'pointer-events-none opacity-30'
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
  );
}
