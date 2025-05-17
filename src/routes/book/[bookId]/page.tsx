import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import BookReviews from '@/components/reviews/book-reviews';
import BookReviewsSkeleton from '@/components/reviews/book-reviews-skeleton';
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
        <Suspense fallback={<BookDetailSkeleton />}>
          <BookDetail bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookReviewsSkeleton />}>
          <BookReviews bookId={bookId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
