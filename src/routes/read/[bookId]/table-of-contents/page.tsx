import BookReadBackground from '@/components/books/reading/book-read-background';
import BookTableOfContents from '@/components/books/reading/book-table-of-contents';
import BookTableOfContentsSkeleton from '@/components/books/reading/book-table-of-contents-skeleton';
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
        <Suspense fallback={<BookTableOfContentsSkeleton />}>
          <BookTableOfContents bookId={bookId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
