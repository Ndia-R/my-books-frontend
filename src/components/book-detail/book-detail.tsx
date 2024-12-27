import { useAuth } from '@/auth/use-auth';
import ReviewDialog from '@/components/book-detail/review-dialog';
import FavoriteButton from '@/components/favorite-button';
import GenreList from '@/components/genre-list/genre-list';
import MyListButton from '@/components/my-list-button';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate, formatIsbn, priceToString } from '@/lib/util';
import { Book, Genre } from '@/types/book';

type Props = {
  book: Book;
  genres: Genre[];
};

export default function BookDetail({ book, genres }: Props) {
  const { user } = useAuth();
  const genreList = genres.filter((genre) => book.genreIds.includes(genre.id));

  return (
    <>
      <div className="flex flex-col justify-center p-6 pt-10 lg:flex-row">
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <img
            className="h-[360px] rounded object-cover sm:h-[480px]"
            src={book.imageUrl}
            alt={book.title}
          />
          <div className="my-4 flex items-center">
            <div className="w-20"></div>
            <Button className="w-32 rounded-full" size="lg">
              読む
            </Button>

            <div className="flex w-20 items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <MyListButton />
                </TooltipTrigger>
                {user ? (
                  <TooltipContent>マイリストに追加</TooltipContent>
                ) : (
                  <TooltipContent>
                    ログインしてこの本を「マイリスト」に加えましょう
                  </TooltipContent>
                )}
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <FavoriteButton book={book} />
                </TooltipTrigger>
                {user ? (
                  <TooltipContent>お気に入りに追加</TooltipContent>
                ) : (
                  <TooltipContent>
                    ログインしてこの本を「お気に入り」に加えましょう
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
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

          <GenreList className="gap-2" genres={genreList} variant="outline" />

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
                <p>{formatDate(book.publishedDate)}</p>
              </div>
              <div className="flex">
                <p className="min-w-20">ページ数</p>
                <p>{`${book.pageCount}ページ`}</p>
              </div>
              <div className="flex">
                <p className="min-w-20">価格</p>
                <p>{priceToString(book.price)}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-end gap-y-4 sm:items-end">
              <Rating rating={4.5} readOnly />
              <ReviewDialog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
