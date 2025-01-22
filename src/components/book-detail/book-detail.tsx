import FavoriteButton from '@/components/favorite-button';
import GenreList from '@/components/genre-list/genre-list';
import MyListButton from '@/components/my-list-button';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { getBookDetailById, getGenres } from '@/lib/data';
import { formatDateJP, formatIsbn, priceToString } from '@/lib/util';
import { useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
};

export default function BookDetail({ bookId }: Props) {
  const [{ data: bookDetail }, { data: genres }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['getBookDetailById', bookId],
        queryFn: () => getBookDetailById(bookId),
      },
      {
        queryKey: ['getGenres'],
        queryFn: () => getGenres(),
      },
    ],
  });

  const { user } = useUser();

  return (
    <div className="flex flex-col justify-center p-3 pt-10 sm:p-6 lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-1/2">
        <img
          className="h-[360px] rounded object-cover sm:h-[480px]"
          src={bookDetail.imageUrl}
          alt={bookDetail.title}
        />
        <div className="mt-2 flex flex-col items-center sm:w-[440px]">
          <div className="flex items-center gap-x-2">
            <Rating rating={bookDetail.rating} readOnly />
            <p className="text-sm text-muted-foreground">{`( ${bookDetail.reviewCount} )`}</p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-x-1">
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
              <p className="flex min-w-6 text-sm text-muted-foreground">
                {bookDetail.myListCount}
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <FavoriteButton bookId={bookId} withCount />
            </div>
          </div>
        </div>

        <div className="my-4 flex items-center">
          <Button className="w-48 rounded-full" size="lg">
            読む
          </Button>
        </div>
      </div>

      <div className="p-4 lg:w-1/2">
        <p className="text-3xl font-bold sm:text-4xl">{bookDetail.title}</p>

        <div className="my-4 flex w-full flex-wrap items-center justify-end gap-x-3">
          <p>著者</p>
          {bookDetail.authors.map((author) => (
            <p className="text-lg font-bold sm:text-2xl" key={author}>
              {author}
            </p>
          ))}
        </div>

        <GenreList
          className="gap-2"
          genres={genres}
          filterList={bookDetail.genreIds}
          variant="outline"
        />

        <div className="my-6 md:my-10">{bookDetail.description}</div>

        <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
          <div className="flex flex-col gap-y-1 text-muted-foreground">
            <div className="flex">
              <p className="min-w-20">ISBN</p>
              <p>{formatIsbn(bookDetail.isbn)}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">出版社</p>
              <p>{bookDetail.publisher}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">発売日</p>
              <p className="tracking-wide">{formatDateJP(bookDetail.publishedDate)}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">ページ数</p>
              <p>{`${bookDetail.pageCount}ページ`}</p>
            </div>
            <div className="flex">
              <p className="min-w-20">価格</p>
              <p>{priceToString(bookDetail.price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
