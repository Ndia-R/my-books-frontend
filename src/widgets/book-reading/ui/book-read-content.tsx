import {
  bookQueryKeys,
  getBookChapterPageContent,
  getBookChapterPagePreview,
  getBookPreviewSettingPublic,
  getBookToc,
  isLastPreviewPage,
} from '@/entities/book';
import {
  bookmarkQueryKeys,
  getUserBookmarksByBookId,
  type BookmarkPage,
} from '@/entities/bookmark';
import { APP_TITLE } from '@/shared/config/constants';
import { chapterNumberString } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import BookReadBookmarkButton from '@/widgets/book-reading/ui/book-read-bookmark-button';
import BookReadNavigation from '@/widgets/book-reading/ui/book-read-navigation';
import BookReadPaywall from '@/widgets/book-reading/ui/book-read-paywall';
import BookReadTocButton from '@/widgets/book-reading/ui/book-read-toc-button';
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
        queryKey: bookQueryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
      },
      {
        queryKey: isPreviewMode
          ? bookQueryKeys.getBookChapterPagePreview(
              bookId,
              chapterNumber,
              pageNumber
            )
          : bookQueryKeys.getBookChapterPageContent(
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
        queryKey: bookQueryKeys.getBookPreviewSettingPublic(bookId),
        queryFn: () => getBookPreviewSettingPublic(bookId),
      },
    ],
  });

  // ブックマークは通常モードのみ useQuery で取得
  const { data: bookmark } = useQuery({
    queryKey: bookmarkQueryKeys.getUserBookmarksByBookId(bookId),
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
