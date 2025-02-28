import BookmarkButton from '@/components/count-icon/bookmark-button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import { cn } from '@/lib/util';
import { Bookmark, BookTableOfContents } from '@/types';
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

  const chapterIndex = bookTableOfContents.chapters.findIndex(
    (chapter) => chapter.chapterNumber === chapterNumber
  );
  const totalPage = bookTableOfContents.chapters[chapterIndex]?.pageNumbers.length ?? 1;
  const pageTitle = `（${pageNumber}/${totalPage}）`;

  const isFirstPage = chapterNumber === 1 && pageNumber === 1;
  const isLastPage =
    chapterNumber === bookTableOfContents.chapters.length &&
    pageNumber ===
      bookTableOfContents.chapters.find(
        (chapter) => chapter.chapterNumber === chapterNumber
      )?.pageNumbers.length;

  /**
   * 指定方向（次 or 前）のページ情報を取得する関数
   */
  const getPageInfo = (
    bookTableOfContents: BookTableOfContents,
    chapterNumber: number,
    pageNumber: number,
    direction: 'next' | 'prev'
  ) => {
    const chapterIndex = bookTableOfContents.chapters.findIndex(
      (chapter) => chapter.chapterNumber === chapterNumber
    );

    if (chapterIndex === -1) return { chapterNumber, pageNumber };

    const totalPages =
      bookTableOfContents.chapters[chapterIndex]?.pageNumbers.length ?? 1;
    const isMovingForward = direction === 'next';

    const isLastPage = pageNumber >= totalPages;
    const isFirstPage = pageNumber <= 1;
    const isLastChapter = chapterIndex >= bookTableOfContents.chapters.length - 1;
    const isFirstChapter = chapterIndex <= 0;

    let newChapterNumber = chapterNumber;
    let newPageNumber = pageNumber;

    if (isMovingForward) {
      if (isLastPage) {
        // 最終章の最後のページなら、それ以上進めない
        if (isLastChapter) {
          newPageNumber = totalPages; // 現在の最後のページのまま
        } else {
          // 次のチャプターの最初のページへ
          newChapterNumber = chapterNumber + 1;
          newPageNumber = 1;
        }
      } else {
        newPageNumber = pageNumber + 1;
      }
    } else {
      if (isFirstPage) {
        // 最初の章の最初のページなら、それ以上戻れない
        if (isFirstChapter) {
          newPageNumber = 1; // 現在の最初のページのまま
        } else {
          // 前のチャプターの最後のページへ
          newChapterNumber = chapterNumber - 1;
          newPageNumber =
            bookTableOfContents.chapters[chapterIndex - 1].pageNumbers.length;
        }
      } else {
        newPageNumber = pageNumber - 1;
      }
    }

    return { chapterNumber: newChapterNumber, pageNumber: newPageNumber };
  };

  const { chapterNumber: nextChapter, pageNumber: nextPage } = getPageInfo(
    bookTableOfContents,
    chapterNumber,
    pageNumber,
    'next'
  );
  const nextPageLink = `/read/${bookId}/chapter/${nextChapter}/page/${nextPage}`;

  const { chapterNumber: prevChapter, pageNumber: prevPage } = getPageInfo(
    bookTableOfContents,
    chapterNumber,
    pageNumber,
    'prev'
  );
  const prevPageLink = `/read/${bookId}/chapter/${prevChapter}/page/${prevPage}`;

  return (
    <div className="delay-0 duration-200 animate-in fade-in-0">
      <div className="flex flex-col gap-y-12 px-4 pb-6 pt-12 sm:px-20">
        <div className="flex flex-col items-start justify-center gap-x-2">
          <p className="mb-2 text-xs text-muted-foreground/70 sm:text-sm">{`chapter ${bookContentPage.chapterNumber}`}</p>
          <div className="text-xl font-bold sm:text-2xl">
            {bookContentPage.chapterTitle}
            <span className="text-sm text-muted-foreground sm:text-base">
              {pageTitle}
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
            isFirstPage ? 'pointer-events-none opacity-30' : ''
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
            isLastPage ? 'pointer-events-none opacity-30' : ''
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
