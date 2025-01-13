import BookListByQuery from '@/components/book-list/book-list-by-query';
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
          <BookListByQuery query={'ライオン'} page={1} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
