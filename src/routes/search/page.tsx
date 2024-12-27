import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-list/book-pagination';
import { getBooksByQuery } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { PaginatedBook } from '@/types/book';
import { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  ScrollRestoration,
  useLoaderData,
} from 'react-router-dom';

type LoaderFunctionReturnType = {
  paginatedBook: Promise<PaginatedBook>;
  query: string;
  page: number;
};

const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? undefined;

  const page = Number(url.searchParams.get('page') ?? '1');
  const paginatedBook = getBooksByQuery(query, page - 1);

  return { paginatedBook, query, page };
};

export default function Page() {
  const { paginatedBook, query } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <p className="my-2">
        {`「 ${query} 」`}
        <span className="text-sm text-muted-foreground">の検索結果</span>
      </p>

      <div className="flex flex-col gap-y-4 pb-4">
        <Suspense fallback={<BookListSkeleton />}>
          <Await resolve={paginatedBook} errorElement={<ErrorElement />}>
            {(paginatedBook: PaginatedBook) => (
              <>
                <BookPagination totalPages={paginatedBook.totalPages} />
                <BookList books={paginatedBook.books} />
                <BookPagination totalPages={paginatedBook.totalPages} />
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
