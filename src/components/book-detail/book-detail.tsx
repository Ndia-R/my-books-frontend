import FavoriteCountIcon from '@/components/count-icon/favorite-count-icon';
import ReviewCountIcon from '@/components/count-icon/review-count-icon';
import GenreList from '@/components/genres/genre-list';
import Rating from '@/components/rating';
import { buttonVariants } from '@/components/ui/button';
import { APP_TITLE, BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { getBookDetails, getBookFavoriteCounts } from '@/lib/api/books';
import { isBookFavoritedByUser } from '@/lib/api/user';
import { cn, formatDateJP, formatIsbn, formatPrice } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookDetail({ bookId }: Props) {
  const { isAuthenticated } = useAuth();

  const [{ data: book }, { data: favoriteCounts }] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.book.details(bookId),
        queryFn: () => getBookDetails(bookId),
      },
      {
        queryKey: queryKeys.book.favoriteCounts(bookId),
        queryFn: () => getBookFavoriteCounts(bookId),
      },
    ],
  });

  // 認証済みの場合のみデータを取得する
  const { data: isFavorite = false } = useQuery({
    queryKey: queryKeys.user.isBookFavoritedByUser(bookId),
    queryFn: () => isBookFavoritedByUser(bookId),
    enabled: isAuthenticated,
  });

  return (
    <>
      <title>{`${book.title} - ${APP_TITLE}`}</title>

      <div className="flex flex-col justify-center p-3 pt-10 sm:p-6 lg:flex-row">
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <Link to={`/read/${bookId}/table-of-contents`} className="size-fit">
            <img
              className="h-[360px] rounded-sm object-cover sm:h-[480px]"
              src={BOOK_IMAGE_BASE_URL + book.imagePath}
              alt={book.title}
            />
          </Link>
          <div className="mt-2 flex flex-col items-center justify-around sm:w-[440px] sm:flex-row">
            <Rating rating={book.averageRating} readOnly />
            <div className="flex justify-center gap-x-2">
              <ReviewCountIcon reviewCount={book.reviewCount} />
              <FavoriteCountIcon
                bookId={bookId}
                isFavorite={isFavorite}
                count={favoriteCounts.favoriteCount}
                showCount={true}
              />
            </div>
          </div>
          <div className="my-4 flex items-center">
            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-44 rounded-full bg-transparent'
              )}
              to={`/read/${bookId}/table-of-contents`}
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

          <GenreList genres={book.genres} variant="outline" />

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
