import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import ReviewList from '@/components/review-list/review-list';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import { getBookById, getGenres } from '@/lib/data';
import { Book, Genre, Review } from '@/types/book';
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
  reviews: Promise<Review[]>;
};

const loader = ({ params }: LoaderFunctionArgs) => {
  const book = getBookById(params.bookId);
  const genres = getGenres();

  const reviews: Review[] = [
    {
      id: 1,
      bookId: '',
      name: 'Julia',
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit harum facilis illo sint, est quos eveniet, sapiente dolor placeat tempore minus maxime laboriosam, aliquid eaque ad? Aut, quam corrupti.',
      rating: 4.5,
      avatarUrl: '/images/avatar02.png',
      updatedAt: '2024-12-24',
    },
    {
      id: 2,
      bookId: '',
      name: '山田 太郎',
      comment: 'すごく面白かったです',
      rating: 5.0,
      avatarUrl: '/images/avatar03.png',
      updatedAt: '2023-01-05',
    },
    {
      id: 3,
      bookId: '',
      name: 'Lili',
      comment: 'まさかこんな展開になるとは。。最後までハラハラドキドキしました。',
      rating: 3.5,
      avatarUrl: '/images/avatar06.png',
      updatedAt: '2022-08-29',
    },
  ];

  const ret = new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews);
    }, 3000);
  });

  return { book, genres, reviews: ret };
};

export default function Page() {
  const { book, genres, reviews } = useLoaderData() as LoaderFunctionReturnType;

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

      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <ReviewListSkeleton />
          </div>
        }
      >
        <Await resolve={reviews}>{(reviews) => <ReviewList reviews={reviews} />}</Await>
      </Suspense>

      <ScrollRestoration />
    </>
  );
}

Page.loader = loader;
