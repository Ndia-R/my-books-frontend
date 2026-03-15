import { useSearchFilters } from '@/features/book-search';
import { APP_TITLE } from '@/shared/config/constants';
import ErrorElement from '@/shared/ui/error-element';
import { Separator } from '@/shared/ui/separator';
import { BookDiscovery, BooksSkeleton } from '@/widgets/book-discovery';
import {
  GenresConditionSelector,
  GenresSelector,
  GenresSkeleton,
} from '@/widgets/genres';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { genreIds, condition, page } = useSearchFilters();

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-4 flex min-h-10 items-center justify-between">
        <h1 className="text-lg font-bold sm:text-xl">ジャンル</h1>
        <GenresConditionSelector />
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<GenresSkeleton />}>
          <GenresSelector />
        </Suspense>
      </ErrorBoundary>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BookDiscovery
            genreIds={genreIds}
            condition={condition}
            page={page}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
