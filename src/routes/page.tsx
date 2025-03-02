import BooksNewReleases from '@/components/books/books-new-releases';
import BooksSkeleton from '@/components/books/books-skeleton';
import GenresSkeleton from '@/components/genres/genres-skeleton';
import GenresTopPage from '@/components/genres/genres-top-page';
import Hero from '@/components/layout/hero';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
      <Hero />

      <div className="flex flex-col">
        <p className="font-bold text-primary">ジャンル</p>

        <div className="my-4">
          <ErrorBoundary fallback={<ErrorElement />}>
            <Suspense fallback={<GenresSkeleton />}>
              <GenresTopPage />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-4 font-bold text-primary">ニューリリース</p>
        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<BooksSkeleton />}>
            <BooksNewReleases />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
