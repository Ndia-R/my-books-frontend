import { useSearchFilters } from '@/features/book-search';
import { APP_TITLE } from '@/shared/config/constants';
import ErrorElement from '@/shared/ui/error-element';
import { Separator } from '@/shared/ui/separator';
import { BookSearch, BooksSkeleton } from '@/widgets/book-discovery';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  const { q, page } = useSearchFilters();

  return (
    <>
      <title>{`${q} - ${APP_TITLE}`}</title>

      <div className="my-4 flex min-h-10 items-center">
        <h1>
          <span className="text-lg font-bold sm:text-xl">「 {q} 」</span>
          <span className="text-muted-foreground text-sm">の検索結果</span>
        </h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BookSearch q={q} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
