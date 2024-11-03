import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import { getBookById, getGenres } from '@/lib/data';
import { Book, Genre } from '@/types/book';
import { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  ScrollRestoration,
  useLoaderData,
} from 'react-router-dom';

type LoaderFunctionReturnType = {
  book: Promise<Book>;
  genres: Promise<Genre[]>;
};

const loader = ({ params }: LoaderFunctionArgs) => {
  const book = getBookById(params.bookId);
  const genres = getGenres();
  return { book, genres };
};

export default function Page() {
  const { book, genres } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <Suspense fallback={<BookDetailSkeleton />}>
        <Await resolve={genres}>
          {(genres) => (
            <Await resolve={book}>
              {(book) => <BookDetail book={book} genres={genres} />}
            </Await>
          )}
        </Await>
      </Suspense>

      <ScrollRestoration />
    </>
  );
}

Page.loader = loader;
