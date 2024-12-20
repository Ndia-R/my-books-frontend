import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-list/book-pagination';
import GenreSelector from '@/components/genre-list/genre-selector';
import { Separator } from '@/components/ui/separator';
import { getBooksByGenreId, getGenres } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { BookResponse, Genre } from '@/types/book';
import { Suspense } from 'react';
import {
  Await,
  defer,
  LoaderFunctionArgs,
  ScrollRestoration,
  useLoaderData,
} from 'react-router-dom';

type LoaderFunctionReturnType = {
  bookResponse: Promise<BookResponse>;
  genres: Genre[];
  genreIds: number[];
};

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const ids = url.searchParams.get('genreId');

  const genreIds = ids?.split(',').map((id) => Number(id));
  const page = Number(url.searchParams.get('page') ?? '1');

  const bookResponse = getBooksByGenreId(genreIds, page - 1);
  const genres = await getGenres();

  return defer({ bookResponse, genres, genreIds });
};

export default function Page() {
  const { bookResponse, genres } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <GenreSelector className="mb-4" genres={genres} />

      <Separator className="mb-6" />

      <div className="flex flex-col gap-y-4 pb-4">
        <Suspense fallback={<BookListSkeleton />}>
          <Await resolve={bookResponse} errorElement={<ErrorElement />}>
            {(bookResponse: BookResponse) => (
              <>
                <BookPagination totalPages={bookResponse.totalPages} />
                <BookList books={bookResponse.books} />
                <BookPagination totalPages={bookResponse.totalPages} />
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
