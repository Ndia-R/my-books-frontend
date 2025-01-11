import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import ReviewList from '@/components/review-list/review-list';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import { getBookById, getGenres, getReviewsByBookId } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { Book, Genre } from '@/types/book';
import { Review } from '@/types/review';
import { Suspense } from 'react';
import { Await, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

type LoaderFunctionReturnType = {
  genres: Genre[];
  book: Promise<Book | null>;
  reviews: Promise<Review[]>;
};

const loader = async ({ params }: LoaderFunctionArgs) => {
  const genres = await getGenres();
  const book = getBookById(params.bookId);
  const reviews = getReviewsByBookId(params.bookId);

  return { book, genres, reviews };
};

export default function Page() {
  const { book, genres, reviews } = useLoaderData() as LoaderFunctionReturnType;

  return (
    <>
      <Suspense fallback={<BookDetailSkeleton />}>
        <Await resolve={book} errorElement={<ErrorElement />}>
          {(book) => <BookDetail book={book} genres={genres} />}
        </Await>
      </Suspense>

      <div className="mx-auto w-full lg:w-3/4">
        <Suspense fallback={<ReviewListSkeleton />}>
          <Await resolve={reviews} errorElement={<ErrorElement />}>
            {(reviews) => <ReviewList reviews={reviews} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

Page.loader = loader;
