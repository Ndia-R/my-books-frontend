import Bookmarks from '@/components/bookmarks/bookmarks';
import BookmarksSkeleton from '@/components/bookmarks/bookmarks-skeleton';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';
import ErrorElement from '@/routes/error-element';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="m-4 flex h-10 items-center">
        <h1 className="text-lg font-bold sm:text-xl">ブックマーク</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookmarksSkeleton />}>
          <Bookmarks />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
