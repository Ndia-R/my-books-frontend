import BookListFavorites from '@/components/book-list/book-list-favorites';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
      <p className="my-2">お気に入り</p>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListFavorites page={1} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
