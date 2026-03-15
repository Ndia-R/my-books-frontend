import ErrorElement from '@/shared/ui/error-element';
import { Separator } from '@/shared/ui/separator';
import { BookNewReleases, BooksSkeleton } from '@/widgets/book-discovery';
import { GenresSkeleton, GenresTopPage } from '@/widgets/genres';
import { Hero } from '@/widgets/layout';
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
