import BookListByGenreId from '@/components/book-list/book-list-by-genre-id';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import GenreConditionSelector from '@/components/genre-list/genre-condition-selector';
import GenreIdsSelector from '@/components/genre-list/genre-ids-selector';
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
        <GenreConditionSelector />
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <GenreIdsSelector />

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListByGenreId
            genreIdsQuery={genreIdsQuery}
            conditionQuery={conditionQuery}
            page={page}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
