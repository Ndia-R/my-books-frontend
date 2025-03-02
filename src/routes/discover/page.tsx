import BooksDiscover from '@/components/books/books-discover';
import BooksSkeleton from '@/components/books/books-skeleton';
import GenresConditionSelector from '@/components/genres/genres-condition-selector';
import GenresDiscover from '@/components/genres/genres-discover';
import GenresSkeleton from '@/components/genres/genres-skeleton';
import { Separator } from '@/components/ui/separator';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const genreIdsQuery = searchParams.get('genreIds') || '';
  const conditionQuery = searchParams.get('condition') || '';
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <div className="m-4 flex h-10 items-center justify-between">
        <p>ジャンル</p>
        <GenresConditionSelector />
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<GenresSkeleton />}>
          <GenresDiscover />
        </Suspense>
      </ErrorBoundary>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BooksDiscover
            genreIdsQuery={genreIdsQuery}
            conditionQuery={conditionQuery}
            page={page}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
