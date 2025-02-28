import BookmarkList from '@/components/bookmark/bookmark-list';
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
        <p>ブックマーク</p>
      </div>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<div>Loading...</div>}>
          <BookmarkList page={page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
