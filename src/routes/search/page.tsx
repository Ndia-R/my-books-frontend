import BookListByQuery from '@/components/book-list/book-list-by-query';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <p className="my-2">
        {`「 ${query} 」`}
        <span className="text-sm text-muted-foreground">の検索結果</span>
      </p>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListByQuery query={query} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
