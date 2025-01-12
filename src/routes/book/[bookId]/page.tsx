import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import ReviewList from '@/components/review-list/review-list';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';

  return (
    <>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookDetailSkeleton />}>
          <BookDetail bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<ReviewListSkeleton />}>
          <ReviewList bookId={bookId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
