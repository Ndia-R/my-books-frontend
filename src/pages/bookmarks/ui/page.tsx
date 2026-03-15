import { APP_TITLE } from '@/shared/config/constants';
import ErrorElement from '@/shared/ui/error-element';
import { Separator } from '@/shared/ui/separator';
import { Bookmarks, BookmarksSkeleton } from '@/widgets/bookmarks';
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
