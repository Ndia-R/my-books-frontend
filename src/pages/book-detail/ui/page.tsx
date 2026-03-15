import { useAuth } from '@/entities/user';
import ErrorElement from '@/shared/ui/error-element';
import { BookDetail, BookDetailSkeleton } from '@/widgets/book-detail';
import { BookReviews, BookReviewsSkeleton } from '@/widgets/book-reviews';
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
