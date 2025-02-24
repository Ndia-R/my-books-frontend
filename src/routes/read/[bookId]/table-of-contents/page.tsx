import BookTableOfContents from '@/components/book-read/book-table-of-contents';
import BookTableOfContentsSkeleton from '@/components/book-read/book-table-of-contents-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';

  return (
    <ErrorBoundary fallback={<ErrorElement />}>
      <Suspense fallback={<BookTableOfContentsSkeleton />}>
        <BookTableOfContents bookId={bookId} />
      </Suspense>
    </ErrorBoundary>
  );
}
