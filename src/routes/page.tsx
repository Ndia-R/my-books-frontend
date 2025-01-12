import BookListNewReleases from '@/components/book-list/book-list-new-releases';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import GenreList from '@/components/genre-list/genre-list';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import Hero from '@/components/layout/hero';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
      <Hero />

      <div className="flex flex-col">
        <p className="font-bold text-primary">ジャンルから探す</p>

        <div className="my-4">
          <ErrorBoundary fallback={<ErrorElement />}>
            <Suspense fallback={<GenreListSkeleton />}>
              <GenreList variant="ghost" />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-bold text-primary mb-4">ニューリリース</p>
        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<BookListSkeleton paginationOff />}>
            <BookListNewReleases />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
