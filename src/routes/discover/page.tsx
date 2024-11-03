import BookList from '@/components/book-list/book-list';
import BookListEmpty from '@/components/book-list/book-list-empty';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { getBooksByGenreId, getGenres } from '@/lib/data';
import { BookResponse, Genre } from '@/types/book';
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
  genres: Promise<Genre[]>;
  genreIds: number[];
};

const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const ids = url.searchParams.get('genreId');

  const genreIds = ids?.split(',').map((id) => Number(id));
  const page = Number(url.searchParams.get('page') ?? '1');

  const bookResponse = getBooksByGenreId(genreIds, page - 1);
  const genres = getGenres();

  return { bookResponse, genres, genreIds };
};

const ErrorElement = () => {
  const error = useAsyncError();
  console.log(error);

  return <BookListEmpty />;
};

export default function Page() {
  const { bookResponse, genres, genreIds } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <Suspense fallback={<Skeleton className="my-2 h-5 w-32 rounded-full" />}>
        <Await resolve={genres} errorElement={<ErrorElement />}>
          {(resolved: Genre[]) => {
            const genreString = resolved
              .filter((genre) => genreIds.includes(genre.id))
              .map((genre) => genre.name)
              .join(' & ');
            return (
              <p className="my-2 text-sm text-muted-foreground">{`「 ${genreString} 」のジャンル`}</p>
            );
          }}
        </Await>
      </Suspense>

      <div className="flex flex-col gap-y-4 pb-4">
        <Suspense fallback={<BookListSkeleton />}>
          <Await resolve={bookResponse} errorElement={<ErrorElement />}>
            {(resolved: BookResponse) => (
              <>
                <BookPagination totalPages={resolved.totalPages} />
                <BookList books={resolved.books} />
                <BookPagination totalPages={resolved.totalPages} />
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
