import BookDetail from '@/components/books/detail/book-detail';
import BookDetailSkeleton from '@/components/books/detail/book-detail-skeleton';
import BookReviews from '@/components/reviews/book-reviews';
import BookReviewsSkeleton from '@/components/reviews/book-reviews-skeleton';
import ErrorElement from '@/components/shared/error-element';
import { useAuth } from '@/providers/auth-provider';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';

  const { isAuthenticated } = useAuth();

  return (
    <>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookDetailSkeleton />}>
          <BookDetail bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      {isAuthenticated && (
        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<BookReviewsSkeleton />}>
            <BookReviews bookId={bookId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
