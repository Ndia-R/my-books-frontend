import BookDetail from '@/widgets/book-detail/ui/book-detail';
import BookDetailSkeleton from '@/widgets/book-detail/ui/book-detail-skeleton';
import BookReviews from '@/widgets/book-reviews/ui/book-reviews';
import BookReviewsSkeleton from '@/widgets/book-reviews/ui/book-reviews-skeleton';
import ErrorElement from '@/shared/ui/error-element';
import { useAuth } from '@/app/providers/auth-provider';
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
