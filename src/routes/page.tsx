import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import GenreList from '@/components/genre-list/genre-list';
import Hero from '@/components/layout/hero';
import { getGenres, getNewReleases } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { Book, Genre } from '@/types/book';
import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

type LoaderFunctionReturnType = {
  genres: Genre[];
  newReleases: Promise<Book[]>;
};

const loader = async () => {
  const genres = await getGenres();
  const newReleases = getNewReleases();
  return defer({ genres, newReleases });
};

export default function Page() {
  const { genres, newReleases } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <Hero />

      <div className="flex flex-col">
        <p className="font-bold text-primary">ジャンルから探す</p>
        <GenreList className="my-4" genres={genres} variant="ghost" />
      </div>

      <div className="flex flex-col">
        <p className="font-bold text-primary">ニューリリース</p>
        <div className="my-4 flex flex-col gap-y-4">
          <Suspense fallback={<BookListSkeleton paginationOff />}>
            <Await resolve={newReleases} errorElement={<ErrorElement />}>
              {(newReleases: Book[]) => <BookList books={newReleases} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}

Page.loader = loader;
