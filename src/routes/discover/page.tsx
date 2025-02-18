import BookListByGenreId from '@/components/book-list/book-list-by-genre-id';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import GenreSelector from '@/components/genre-list/genre-selector';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const genreId = searchParams.get('genreId') || '';
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <GenreSelector />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListByGenreId genreId={genreId} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
