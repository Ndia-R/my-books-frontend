import BookmarkCreateDialog from '@/components/bookmarks/bookmark-create-dialog';
import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import {
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from '@/lib/api/bookmarks';
import {
  getBookChapterPageContent,
  getBookTableOfContents,
} from '@/lib/api/books';
import { getUserBookmarksForBook } from '@/lib/api/user';
import { chapterNumberString, cn } from '@/lib/utils';
import { Bookmark, BookmarkRequest, BookTableOfContents } from '@/types';
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

// 「現在のページ/総ページ数」を表す文字列を返す
const getCurrentPageText = (
  bookTableOfContents: BookTableOfContents,
  chapterNumber: number,
  pageNumber: number
) => {
  // 章番号が見つからなかった場合でも chapterIndex は少なくとも1にする
  const chapterIndex = Math.max(
    1,
    bookTableOfContents.chapters.findIndex(
      (chapter) => chapter.chapterNumber === chapterNumber
    )
  );

  const totalPage =
    bookTableOfContents.chapters[chapterIndex]?.pageNumbers.length ?? 1;
  return `${pageNumber}/${totalPage}`;
};

// 現在のページが最初か最後かを判定する
const getPagePosition = (
  bookTableOfContents: BookTableOfContents,
  chapterNumber: number,
  pageNumber: number
) => {
  const isFirstPage = chapterNumber === 1 && pageNumber === 1;
  const isLastPage =
    chapterNumber === bookTableOfContents.chapters.length &&
    pageNumber ===
      bookTableOfContents.chapters.find(
        (chapter) => chapter.chapterNumber === chapterNumber
      )?.pageNumbers.length;

  return { isFirstPage, isLastPage };
};

// 指定方向（次 or 前）のページのリンク先を返す
const getPageLink = (
  bookTableOfContents: BookTableOfContents,
  chapterNumber: number,
  pageNumber: number,
  direction: 'next' | 'prev'
) => {
  const chapterIndex = bookTableOfContents.chapters.findIndex(
    (chapter) => chapter.chapterNumber === chapterNumber
  );

  if (chapterIndex === -1) {
    return `/read/${bookTableOfContents.bookId}/chapter/${chapterNumber}/page/${pageNumber}`;
  }

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

  return `/read/${bookTableOfContents.bookId}/chapter/${newChapterNumber}/page/${newPageNumber}`;
};

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

  const [
    { data: bookTableOfContents },
    { data: bookChapterPageContent },
    { data: bookmark },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.book.tableOfContents(bookId),
        queryFn: () => getBookTableOfContents(bookId),
      },
      {
        queryKey: queryKeys.book.chapterPageContent(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPageContent(bookId, chapterNumber, pageNumber),
      },
      {
        queryKey: queryKeys.user.bookmarksForBook(bookId),
        queryFn: () => getUserBookmarksForBook(bookId),
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
      queryKey: queryKeys.user.bookmarksForBook(bookId),
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
      bookmarkId,
      requestBody,
    }: {
      bookmarkId: number;
      requestBody: BookmarkRequest;
    }) => updateBookmark(bookmarkId, requestBody),
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

  return (
    <>
      <title>{`${bookChapterPageContent.chapterTitle} (${currentPageText}) - ${APP_TITLE}`}</title>

      <div className="animate-in fade-in-0 delay-0 duration-200">
        <div className="flex flex-col gap-y-12 px-4 pt-12 pb-6 sm:px-20">
          <div>
            <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
              {chapterNumberString(bookChapterPageContent.chapterNumber)}
            </p>
            <div className="flex flex-wrap items-center">
              <h1 className="text-xl font-bold text-wrap sm:text-2xl">
                {bookChapterPageContent.chapterTitle}
              </h1>
              <p className="text-muted-foreground mr-2 ml-4 text-xs sm:text-sm">
                {currentPageText}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                    })}
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
                      'text-muted-foreground size-8',
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
          <p className="whitespace-pre-wrap">
            {bookChapterPageContent.content}
          </p>
        </div>
        <div className="flex justify-between px-0 py-6 sm:px-12">
          <Button
            className={cn(
              'flex items-center gap-x-2 hover:bg-transparent',
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
              'flex items-center gap-x-2 hover:bg-transparent',
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
