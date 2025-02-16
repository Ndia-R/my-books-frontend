import FavoriteCountIcon from '@/components/favorite-count-icon';
import GenreList from '@/components/genre-list/genre-list';
import Rating from '@/components/rating';
import ReviewCountIcon from '@/components/review-count-icon';
import { Button } from '@/components/ui/button';
import { getBookById, getGenres, getReviewSummary } from '@/lib/data';
import { formatDateJP, formatIsbn, formatPrice } from '@/lib/util';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function BookDetail({ bookId }: Props) {
  const [{ data: book }, { data: reviewRatingInfo }, { data: genres }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: ['getBookById', bookId],
          queryFn: () => getBookById(bookId),
        },
        {
          queryKey: ['getReviewSummary', bookId],
          queryFn: () => getReviewSummary(bookId),
        },
        {
          queryKey: ['getGenres'],
          queryFn: () => getGenres(),
        },
      ],
    });

  return (
    <div className="flex flex-col justify-center p-3 pt-10 sm:p-6 lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-1/2">
        <Link to={`/read/${bookId}/table-of-contents`}>
          <img
            className="h-[360px] rounded object-cover sm:h-[480px]"
            src={book.imageUrl}
            alt={book.title}
          />
        </Link>
        <div className="mt-2 flex flex-col items-center justify-around sm:w-[440px] sm:flex-row">
          <div className="flex justify-center gap-x-2">
            <ReviewCountIcon bookId={bookId} />
            <FavoriteCountIcon bookId={bookId} />
          </div>
          <Rating rating={reviewRatingInfo.averageRating} readOnly />
        </div>
        <div className="my-4 flex items-center">
          <Button className="w-44 rounded-full bg-transparent" variant="outline" asChild>
            <Link to={`/read/${bookId}/table-of-contents`}>目次を見る</Link>
          </Button>
        </div>
      </div>

      <div className="p-4 lg:w-1/2">
        <p className="text-3xl font-bold sm:text-4xl">{book.title}</p>

        <div className="my-4 flex w-full flex-wrap items-center justify-end gap-x-3">
          <p>著者</p>
          {book.authors.map((author) => (
            <p className="text-lg font-bold sm:text-2xl" key={author}>
              {author}
            </p>
          ))}
        </div>
        <GenreList
          className="gap-2"
          genres={genres}
          filterList={book.genreIds}
          variant="outline"
        />

        <div className="my-6 md:my-10">{book.description}</div>

        <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
          <div className="flex flex-col gap-y-1 text-muted-foreground">
            <div className="flex">
              <p className="min-w-20">ISBN</p>
              <p>{formatIsbn(book.isbn)}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">出版社</p>
              <p>{book.publisher}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">発売日</p>
              <p className="tracking-wide">{formatDateJP(book.publishedDate)}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">ページ数</p>
              <p>{`${book.pageCount}ページ`}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">価格</p>
              <p>{formatPrice(book.price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
