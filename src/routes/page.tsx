import BooksSkeleton from '@/components/books/books-skeleton';
import BookNewReleases from '@/components/books/discovery/book-new-releases';
import GenresSkeleton from '@/components/genres/genres-skeleton';
import GenresTopPage from '@/components/genres/genres-top-page';
import Hero from '@/components/layout/hero';
import { Separator } from '@/components/ui/separator';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
      <section className="mb-4 sm:mb-0">
        <Hero />
      </section>

      <section className="mb-6 flex flex-col sm:mb-16">
        <h2 className="text-lg font-bold sm:text-xl">ジャンル</h2>

        <Separator className="bg-foreground/10 my-4" />

        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<GenresSkeleton />}>
            <GenresTopPage />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="flex flex-col">
        <h2 className="text-lg font-bold sm:text-xl">ニューリリース</h2>

        <Separator className="bg-foreground/10 mt-4 mb-8" />

        <ErrorBoundary fallback={<ErrorElement />}>
          <Suspense fallback={<BooksSkeleton withPagination={false} />}>
            <BookNewReleases />
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  );
}
