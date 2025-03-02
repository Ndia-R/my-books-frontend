import BooksFavorites from '@/components/books/books-favorites';
import BooksSkeleton from '@/components/books/books-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <div className="m-4 flex h-10 items-center">
        <p>お気に入り</p>
      </div>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BooksFavorites page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
