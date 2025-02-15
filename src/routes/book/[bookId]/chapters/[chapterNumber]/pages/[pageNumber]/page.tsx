import BookReading from '@/components/book-reading/book-reading';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';
  const chapterNumber = Number(params.chapterNumber) || 0;
  const pageNumber = Number(params.pageNumber) || 1;

  console.log(bookId, chapterNumber, pageNumber);

  return (
    <ErrorBoundary fallback={<ErrorElement />}>
      <Suspense fallback={<div>Loading...</div>}>
        <BookReading
          bookId={bookId}
          chapterNumber={chapterNumber}
          pageNumber={pageNumber}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
