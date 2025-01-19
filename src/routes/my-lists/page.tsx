import BookListMyLists from '@/components/book-list/book-list-my-lists';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
      <p className="my-2">マイリスト</p>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListMyLists page={1} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
