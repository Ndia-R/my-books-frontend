import BookList from '@/components/book-list/book-list';
import BookListEmpty from '@/components/book-list/book-list-empty';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-pagination';
import { getBooksByQuery } from '@/lib/data';
import { BookResponse } from '@/types/book';
import { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  ScrollRestoration,
  useAsyncError,
  useLoaderData,
} from 'react-router-dom';

type LoaderFunctionReturnType = {
  bookResponse: Promise<BookResponse>;
  query: string;
  page: number;
};

const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  const page = Number(url.searchParams.get('page') ?? '1');
  const bookResponse = getBooksByQuery(query, page - 1);

  return { bookResponse, query, page };
};

const ErrorElement = () => {
  const error = useAsyncError();
  console.log(error);

  return <BookListEmpty />;
};

export default function Page() {
  const { bookResponse, query } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <p className="my-2 text-sm text-muted-foreground">{`「 ${query} 」の検索結果`}</p>

      <div className="flex flex-col gap-y-4 pb-4">
        <Suspense fallback={<BookListSkeleton />}>
          <Await resolve={bookResponse} errorElement={<ErrorElement />}>
            {(resolvedBookResponse: BookResponse) => (
              <>
                <BookPagination totalPages={resolvedBookResponse.totalPages} />
                <BookList books={resolvedBookResponse.books} />
                <BookPagination totalPages={resolvedBookResponse.totalPages} />
              </>
            )}
          </Await>
        </Suspense>
      </div>

      <ScrollRestoration />
    </>
  );
}

Page.loader = loader;
