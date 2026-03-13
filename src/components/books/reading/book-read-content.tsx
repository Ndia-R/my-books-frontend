import BookReadBookmarkButton from '@/components/books/reading/book-read-bookmark-button';
import BookReadNavigation from '@/components/books/reading/book-read-navigation';
import BookReadPaywall from '@/components/books/reading/book-read-paywall';
import BookReadTocButton from '@/components/books/reading/book-read-toc-button';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import {
  getBookChapterPageContent,
  getBookChapterPagePreview,
  getBookPreviewSettingPublic,
  getBookToc,
} from '@/lib/api/books';
import { getUserBookmarksByBookId } from '@/lib/api/users';
import { chapterNumberString } from '@/lib/format';
import { cn, isLastPreviewPage } from '@/lib/utils';
import type { BookmarkPage } from '@/types/bookmark';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  isPreviewMode?: boolean;
};

export default function BookReadContent({
  bookId,
  chapterNumber,
  pageNumber,
  isPreviewMode = false,
}: Props) {
  // 目次（TOC）、有料コンテンツor試し読み、試し読み設定を useSuspenseQueries で取得
  const [
    { data: bookToc },
    { data: bookChapterPageContent },
    { data: BookPreviewSettingPublic },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
      },
      {
        queryKey: isPreviewMode
          ? queryKeys.getBookChapterPagePreview(
              bookId,
              chapterNumber,
              pageNumber
            )
          : queryKeys.getBookChapterPageContent(
              bookId,
              chapterNumber,
              pageNumber
            ),
        queryFn: () =>
          isPreviewMode
            ? getBookChapterPagePreview(bookId, chapterNumber, pageNumber)
            : getBookChapterPageContent(bookId, chapterNumber, pageNumber),
      },
      {
        queryKey: queryKeys.getBookPreviewSettingPublic(bookId),
        queryFn: () => getBookPreviewSettingPublic(bookId),
      },
    ],
  });

  // ブックマークは通常モードのみ useQuery で取得
  const { data: bookmark } = useQuery({
    queryKey: queryKeys.getUserBookmarksByBookId(bookId),
    queryFn: () => getUserBookmarksByBookId(bookId),
    enabled: !isPreviewMode, // プレビューモード（試し読み）では実行しない
    select: (bookmarkPage: BookmarkPage) =>
      bookmarkPage.data.find(
        (bookmark) =>
          bookmark.book.id === bookId &&
          bookmark.chapterNumber === chapterNumber &&
          bookmark.pageNumber === pageNumber
      ),
  });

  // ペイウォール判定
  const isPaywalled =
    isPreviewMode &&
    isLastPreviewPage(BookPreviewSettingPublic, bookChapterPageContent);

  return (
    <>
      <title>{`${bookChapterPageContent.chapterTitle} (${pageNumber}/${bookChapterPageContent.totalPagesInChapter}) - ${APP_TITLE}`}</title>

      <div className="flex flex-col gap-y-12 px-4 pt-12 pb-6 sm:px-20">
        <div>
          <p className="text-muted-foreground mb-2 text-sm sm:text-base">
            {chapterNumberString(chapterNumber)}
          </p>
          <div className="flex flex-wrap items-center">
            <h1 className="text-xl font-bold text-wrap sm:text-2xl">
              {bookChapterPageContent.chapterTitle}
            </h1>
            <p className="text-muted-foreground mr-2 ml-4 text-sm">
              {`${pageNumber}/${bookChapterPageContent.totalPagesInChapter}`}
            </p>
            <BookReadTocButton bookId={bookId} />
            {!isPreviewMode && (
              <BookReadBookmarkButton
                bookChapterPageContent={bookChapterPageContent}
                bookmark={bookmark}
              />
            )}
          </div>
        </div>

        <p
          className={cn(
            'whitespace-pre-wrap',
            isPaywalled &&
              'mask-[linear-gradient(to_bottom,black_50%,transparent)] select-none'
          )}
        >
          {bookChapterPageContent.content}
        </p>

        {isPaywalled ? (
          <BookReadPaywall bookId={bookId} />
        ) : (
          <BookReadNavigation
            bookToc={bookToc}
            chapterNumber={chapterNumber}
            pageNumber={pageNumber}
            isPreviewMode={isPreviewMode}
          />
        )}
      </div>
    </>
  );
}
