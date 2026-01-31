import BookReadPreviewNavigation from '@/components/books/reading/book-read-preview-navigation';
import BookReadTocButton from '@/components/books/reading/book-read-toc-button';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { getBookChapterPagePreview, getBookToc } from '@/lib/api/books';
import { chapterNumberString } from '@/lib/utils';
import { useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookReadPreview({
  bookId,
  chapterNumber,
  pageNumber,
}: Props) {
  const [{ data: bookToc }, { data: bookChapterPageContent }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: queryKeys.getBookToc(bookId),
          queryFn: () => getBookToc(bookId),
        },
        {
          queryKey: queryKeys.getBookChapterPagePreview(
            bookId,
            chapterNumber,
            pageNumber
          ),
          queryFn: () =>
            getBookChapterPagePreview(bookId, chapterNumber, pageNumber),
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
            {/* <BookReadBookmarkButton
              bookChapterPageContent={bookChapterPageContent}
              bookmark={bookmark}
            /> */}
          </div>
        </div>

        <p className="whitespace-pre-wrap">{bookChapterPageContent.content}</p>

        <BookReadPreviewNavigation
          bookToc={bookToc}
          chapterNumber={chapterNumber}
          pageNumber={pageNumber}
        />
      </div>
    </>
  );
}
