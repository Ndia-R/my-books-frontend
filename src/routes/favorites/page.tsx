import BookListFavorites from '@/components/book-list/book-list-favorites';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <p className="my-2">お気に入り</p>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListFavorites page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
