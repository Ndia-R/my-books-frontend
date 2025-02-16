import BookTableOfContents from '@/components/book-read/book-table-of-contents';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';

  return (
    <ErrorBoundary fallback={<ErrorElement />}>
      <Suspense fallback={<div>Loading...</div>}>
        <BookTableOfContents bookId={bookId} />
      </Suspense>
    </ErrorBoundary>
  );
}
