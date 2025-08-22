import FavoriteCountIcon from '@/components/books/stats/favorite-count-icon';
import ReviewCountIcon from '@/components/books/stats/review-count-icon';
import GenreList from '@/components/genres/genre-list';
import Rating from '@/components/shared/rating';
import { buttonVariants } from '@/components/ui/button';
import { APP_TITLE, BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { getBookDetails, getBookFavoriteStats } from '@/lib/api/books';
import { isFavoritedByUser } from '@/lib/api/user';
import { cn, formatDateJP, formatIsbn, formatPrice } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookDetail({ bookId }: Props) {
  const { isAuthenticated } = useAuth();

  const [{ data: book }, { data: favoriteStats }] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.book.details(bookId),
        queryFn: () => getBookDetails(bookId),
      },
      {
        queryKey: queryKeys.book.favoriteStats(bookId),
        queryFn: () => getBookFavoriteStats(bookId),
      },
    ],
  });

  // 認証済みの場合のみデータを取得する
  const { data: isFavorite = false } = useQuery({
    queryKey: queryKeys.user.isFavoritedByUser(bookId),
    queryFn: () => isFavoritedByUser(bookId),
    enabled: isAuthenticated,
  });

  const { prefetchBookTableOfContents } = usePrefetch();

  const handlePrefetch = () => {
    prefetchBookTableOfContents(bookId);
  };

  return (
    <>
      <title>{`${book.title} - ${APP_TITLE}`}</title>

      <div className="flex flex-col justify-start p-3 pt-10 sm:p-6 lg:flex-row">
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <Link
            className="size-fit"
            to={`/read/${bookId}/table-of-contents`}
            aria-label={`${book.title}の目次ページへ移動`}
            onMouseEnter={handlePrefetch}
            onFocus={handlePrefetch}
          >
            <img
              className="h-[360px] rounded-xs object-cover sm:h-[480px]"
              src={BOOK_IMAGE_BASE_URL + book.imagePath}
              alt={book.title}
            />
          </Link>

          <div className="mt-2 flex flex-col items-center justify-around sm:w-[440px] sm:flex-row">
            <Rating rating={book.averageRating} readOnly />
            <div className="flex justify-center gap-x-2">
              <ReviewCountIcon count={book.reviewCount} />
              <FavoriteCountIcon
                bookId={bookId}
                isFavorite={isFavorite}
                count={favoriteStats.favoriteCount}
              />
            </div>
          </div>

          <div className="my-4 flex items-center">
            <Link
              className={cn(buttonVariants({ variant: 'outline' }), 'w-44')}
              to={`/read/${bookId}/table-of-contents`}
              aria-label={`${book.title}の目次ページへ移動`}
              onMouseEnter={handlePrefetch}
              onFocus={handlePrefetch}
            >
              目次を見る
            </Link>
          </div>
        </div>

        <div className="p-4 lg:w-1/2">
          <h1 className="text-3xl font-bold sm:text-4xl">{book.title}</h1>

          <div className="my-4 flex w-full flex-wrap items-center justify-end gap-x-3">
            <p>著者</p>
            {book.authors.map((author) => (
              <p className="text-lg font-bold sm:text-2xl" key={author}>
                {author}
              </p>
            ))}
          </div>

          <GenreList
            genres={book.genres}
            activeIds={book.genres.map((genre) => genre.id)}
          />

          <div className="my-6 md:my-10">{book.description}</div>

          <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
            <div className="text-muted-foreground flex flex-col gap-y-1">
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
                <time
                  className="tracking-wide"
                  dateTime={
                    Date.parse(book.publicationDate) ? book.publicationDate : ''
                  }
                >
                  {formatDateJP(book.publicationDate)}
                </time>
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
    </>
  );
}
