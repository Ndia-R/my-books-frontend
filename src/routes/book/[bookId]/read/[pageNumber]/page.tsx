import BookReading from '@/components/book-reading/book-reading';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';
  const pageNumber = Number(params.pageNumber) || 0;
  return (
    <ErrorBoundary fallback={<ErrorElement />}>
      <Suspense fallback={<div>Loading...</div>}>
        <BookReading bookId={bookId} pageNumber={pageNumber} />
      </Suspense>
    </ErrorBoundary>
  );
}
