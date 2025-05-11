import BooksDiscover from '@/components/books/books-discover';
import BooksSkeleton from '@/components/books/books-skeleton';
import GenresConditionSelector from '@/components/genres/genres-condition-selector';
import GenresSelector from '@/components/genres/genres-selector';
import GenresSkeleton from '@/components/genres/genres-skeleton';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';
import { useSearchFilters } from '@/hooks/use-search-filters';
import ErrorElement from '@/routes/error-element';
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

      <div className="m-4 flex h-10 items-center justify-between">
        <h1 className="font-bold">ジャンル</h1>
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
          <BooksDiscover
            genreIds={genreIds}
            condition={condition}
            page={page}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
