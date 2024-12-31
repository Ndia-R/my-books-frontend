import BookDetail from '@/components/book-detail/book-detail';
import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import ReviewList from '@/components/review-list/review-list';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import { BOOKS_IMAGE_URL } from '@/constants/constants';
import { getBookById, getGenres } from '@/lib/data';
import ErrorElement from '@/routes/error-element';
import { Book, Genre } from '@/types/book';
import { Review } from '@/types/review';
import { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  ScrollRestoration,
  useLoaderData,
} from 'react-router-dom';

type LoaderFunctionReturnType = {
  genres: Genre[];
  book: Promise<Book | null>;
  reviews: Promise<Review[]>;
};

const loader = async ({ params }: LoaderFunctionArgs) => {
  const genres = await getGenres();
  const book = getBookById(params.bookId);

  const reviews: Review[] = [
    {
      id: 1,
      bookId: '',
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit harum facilis illo sint, est quos eveniet, sapiente dolor placeat tempore minus maxime laboriosam, aliquid eaque ad? Aut, quam corrupti.',
      rating: 4.5,
      updatedAt: '2024-12-24',
      user: {
        id: 111,
        name: 'Julia',
        email: 'xxx@example.jp',
        avatarUrl: `${BOOKS_IMAGE_URL}/avatars/avatar00.png`,
        roles: [],
      },
    },
    {
      id: 2,
      bookId: '',
      comment: 'すごく面白かったです',
      rating: 5.0,
      updatedAt: '2023-01-05',
      user: {
        id: 111,
        name: '山田 太郎',
        email: 'xxx@example.jp',
        avatarUrl: `${BOOKS_IMAGE_URL}/avatars/avatar03.png`,
        roles: [],
      },
    },
    {
      id: 3,
      bookId: '',
      comment: 'まさかこんな展開になるとは。。最後までハラハラドキドキしました。',
      rating: 3.5,
      updatedAt: '2022-08-29',
      user: {
        id: 333,
        name: 'Lili',
        email: 'xxx@example.jp',
        avatarUrl: `${BOOKS_IMAGE_URL}/avatars/avatar06.png`,
        roles: [],
      },
    },
  ];

  const ret = new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews);
    }, 2000);
  });

  return { book, genres, reviews: ret };
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

      <ScrollRestoration />
    </>
  );
}

Page.loader = loader;
