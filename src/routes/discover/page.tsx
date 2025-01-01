import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-list/book-pagination';
import GenreSelector from '@/components/genre-list/genre-selector';
import { getBooksByGenreId, getGenres } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { Genre, PaginatedBook } from '@/types/book';
import { Suspense } from 'react';
import { Await, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

type LoaderFunctionReturnType = {
  paginatedBook: Promise<PaginatedBook | null>;
  genres: Genre[];
};

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const genreIdsQuery = url.searchParams.get('genreId') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');

  const paginatedBook = getBooksByGenreId(genreIdsQuery, page - 1);
  const genres = await getGenres();

  return { paginatedBook, genres };
};

export default function Page() {
  const { paginatedBook, genres } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <GenreSelector genres={genres} />

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
    </>
  );
}

Page.loader = loader;
