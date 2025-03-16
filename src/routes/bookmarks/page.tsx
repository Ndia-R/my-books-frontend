import Bookmarks from '@/components/bookmarks/bookmarks';
import BookmarksSkeleton from '@/components/bookmarks/bookmarks-skeleton';
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
        <h1 className="font-bold">ブックマーク</h1>
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookmarksSkeleton />}>
          <Bookmarks page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
