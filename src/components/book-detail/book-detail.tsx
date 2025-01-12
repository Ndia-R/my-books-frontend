import BookDetailSkeleton from '@/components/book-detail/book-detail-skeleton';
import FavoriteButton from '@/components/favorite-button';
import GenreList from '@/components/genre-list/genre-list';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import MyListButton from '@/components/my-list-button';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useFetchData } from '@/hooks/use-fetch-data';
import { useUser } from '@/hooks/use-user';
import { getBookById } from '@/lib/data';
import { formatDateJP, formatIsbn, priceToString } from '@/lib/util';
import ErrorElement from '@/routes/error-element';
import { Book } from '@/types/book';
import { Suspense, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Await } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function BookDetail({ bookId }: Props) {
  const fetcher = useCallback(() => getBookById(bookId), [bookId]);
  const { data: book } = useFetchData({ fetcher });

  const { user } = useUser();

  return (
    <Await resolve={book}>
      {(book: Book) => {
        if (!book) return <BookDetailSkeleton />;
        return (
          <div className="flex flex-col justify-center p-3 pt-10 sm:p-6 lg:flex-row">
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
              <div className="flex items-center gap-x-2">
                <Rating rating={3.5} readOnly />
                <p className="text-sm text-muted-foreground">{`( 3 )`}</p>
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

              <ErrorBoundary fallback={<ErrorElement />}>
                <Suspense fallback={<GenreListSkeleton />}>
                  <GenreList
                    className="gap-2"
                    filterList={book.genreIds}
                    variant="outline"
                  />
                </Suspense>
              </ErrorBoundary>

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
                    <p>{priceToString(book.price)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Await>
  );
}
