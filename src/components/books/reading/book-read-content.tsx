import BookReadBookmarkButton from '@/components/books/reading/book-read-bookmark-button';
import BookReadNavigation from '@/components/books/reading/book-read-navigation';
import BookReadTocButton from '@/components/books/reading/book-read-toc-button';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import {
  getBookChapterPageContent,
  getBookTableOfContents,
} from '@/lib/api/books';
import { getUserBookmarksByBookId } from '@/lib/api/user';
import { chapterNumberString } from '@/lib/utils';
import { BookmarkPage } from '@/types';
import { useSuspenseQueries } from '@tanstack/react-query';

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
  const [
    { data: bookTableOfContents },
    { data: bookChapterPageContent },
    { data: bookmark },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.getBookTableOfContents(bookId),
        queryFn: () => getBookTableOfContents(bookId),
      },
      {
        queryKey: queryKeys.getBookChapterPageContent(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPageContent(bookId, chapterNumber, pageNumber),
      },
      {
        queryKey: queryKeys.getUserBookmarksByBookId(bookId),
        queryFn: () => getUserBookmarksByBookId(bookId),
        select: (bookmarkPage: BookmarkPage) =>
          bookmarkPage.data.find(
            (bookmark) =>
              bookmark.book.id === bookId &&
              bookmark.chapterNumber === chapterNumber &&
              bookmark.pageNumber === pageNumber
          ),
      },
    ],
  });

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
            <BookReadBookmarkButton
              bookChapterPageContent={bookChapterPageContent}
              bookmark={bookmark}
            />
          </div>
        </div>

        <p className="whitespace-pre-wrap">{bookChapterPageContent.content}</p>

        <BookReadNavigation
          bookTableOfContents={bookTableOfContents}
          chapterNumber={chapterNumber}
          pageNumber={pageNumber}
        />
      </div>
    </>
  );
}
