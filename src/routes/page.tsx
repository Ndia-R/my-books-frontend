import BookListNewReleases from '@/components/book-list/book-list-new-releases';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import GenreListTopPage from '@/components/genre-list/genre-list-top-page';
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
              <GenreListTopPage />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-4 font-bold text-primary">ニューリリース</p>
        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<BookListSkeleton />}>
            <BookListNewReleases />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
