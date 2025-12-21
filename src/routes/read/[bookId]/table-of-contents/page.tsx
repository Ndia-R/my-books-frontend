import BookReadBackground from '@/components/books/reading/book-read-background';
import BookToc from '@/components/books/reading/book-toc';
import BookTocSkeleton from '@/components/books/reading/book-toc-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';

  return (
    <>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={null}>
          <BookReadBackground bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookTocSkeleton />}>
          <BookToc bookId={bookId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
