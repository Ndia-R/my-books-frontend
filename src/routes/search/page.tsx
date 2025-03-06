import BooksSearch from '@/components/books/books-search';
import BooksSkeleton from '@/components/books/books-skeleton';
import { Separator } from '@/components/ui/separator';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <div className="m-4 flex h-10 items-center">
        <p>
          「 {searchQuery} 」
          <span className="text-sm text-muted-foreground">の検索結果</span>
        </p>
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BooksSearch searchQuery={searchQuery} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
