import ErrorElement from '@/shared/ui/error-element';
import { BookReadBackground } from '@/widgets/book-reading';
import { BookToc, BookTocSkeleton } from '@/widgets/book-toc';
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
