import Bookmarks from '@/components/bookmarks/bookmarks';
import BookmarksSkeleton from '@/components/bookmarks/bookmarks-skeleton';
import { Separator } from '@/components/ui/separator';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

export default function Page() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');

  return (
    <>
      <div className="m-4 flex h-10 items-center">
        <p className="font-bold">ブックマーク</p>
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
