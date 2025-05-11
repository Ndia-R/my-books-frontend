import Bookmarks from '@/components/bookmarks/bookmarks';
import BookmarksSkeleton from '@/components/bookmarks/bookmarks-skeleton';
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
  const { page } = useSearchFilters();

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="m-4 flex h-10 items-center">
        <h1 className="font-bold">ブックマーク</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookmarksSkeleton />}>
          <Bookmarks page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
