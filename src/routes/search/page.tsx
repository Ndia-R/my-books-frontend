import BooksSearch from '@/components/books/books-search';
import BooksSkeleton from '@/components/books/books-skeleton';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';
import { useSearchFilters } from '@/hooks/use-search-filters';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  const { q, page } = useSearchFilters();

  return (
    <>
      <title>{`${q} - ${APP_TITLE}`}</title>

      <div className="m-4 flex h-10 items-center">
        <h1>
          「 {q} 」
          <span className="text-muted-foreground text-sm">の検索結果</span>
        </h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BooksSearch q={q} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
