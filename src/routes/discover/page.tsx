import BooksDiscover from '@/components/books/books-discover';
import BooksSkeleton from '@/components/books/books-skeleton';
import GenresConditionSelector from '@/components/genres/genres-condition-selector';
import GenresDiscover from '@/components/genres/genres-discover';
import GenresSkeleton from '@/components/genres/genres-skeleton';
import { Separator } from '@/components/ui/separator';
import { useDiscoverQueries } from '@/hooks/use-discover-queries';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  const { genreIds, condition, page, updateQueryParams } = useDiscoverQueries();

  const handleConditionChange = (condition: string) => {
    // SINGLE選択以外は複数ジャンル選択可能OKだが
    // SINGLE選択の場合、複数ジャンルの中の最初の値（単一の値）とする
    const ids = condition === 'SINGLE' ? genreIds.split(',')[0] : undefined;
    updateQueryParams({ genreIds: ids, condition, page: 1 });
  };

  const handleGenreIdsChange = (genreIds: string) => {
    updateQueryParams({ genreIds, page: 1 });
  };

  return (
    <>
      <div className="m-4 flex h-10 items-center justify-between">
        <p className="font-bold">ジャンル</p>
        <GenresConditionSelector
          condition={condition}
          onConditionChange={handleConditionChange}
        />
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<GenresSkeleton />}>
          <GenresDiscover
            genreIds={genreIds}
            condition={condition}
            onGenreIdsChange={handleGenreIdsChange}
          />
        </Suspense>
      </ErrorBoundary>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BooksSkeleton />}>
          <BooksDiscover genreIds={genreIds} condition={condition} page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
