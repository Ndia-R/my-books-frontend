import Favorites from '@/components/favorites/favorites';
import FavoritesSkeleton from '@/components/favorites/favorites-skeleton';
import { Separator } from '@/components/ui/separator';
import { useSearchFilters } from '@/hooks/use-search-filters';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  const { page } = useSearchFilters();

  return (
    <>
      <div className="m-4 flex h-10 items-center">
        <h1 className="font-bold">お気に入り</h1>
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<FavoritesSkeleton />}>
          <Favorites page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
