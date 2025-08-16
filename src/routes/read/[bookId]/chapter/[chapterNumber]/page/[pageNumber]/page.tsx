import BookReadBackground from '@/components/books/reading/book-read-background';
import BookReadContent from '@/components/books/reading/book-read-content';
import BookReadContentSkeleton from '@/components/books/reading/book-read-content-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';
  const chapterNumber = Number(params.chapterNumber) || 1;
  const pageNumber = Number(params.pageNumber) || 1;

  return (
    <>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={null}>
          <BookReadBackground bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookReadContentSkeleton />}>
          <BookReadContent
            bookId={bookId}
            chapterNumber={chapterNumber}
            pageNumber={pageNumber}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
