import FavoriteButton from '@/components/favorite-button';
import GenreList from '@/components/genre-list/genre-list';
import Button from '@/components/ui/button';
import { formatDate, formatIsbn, priceToString } from '@/lib/util';
import { Book, Genre } from '@/types/book';
import { StarHalfIcon, StarIcon } from 'lucide-react';

type Props = {
  book: Book;
  genres: Genre[];
};

export default function BookDetail({ book, genres }: Props) {
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
          <div className="my-4 flex items-center gap-x-2">
            <Button className="w-32 rounded-full" size="lg">
              購入
            </Button>
            <FavoriteButton book={book} />
          </div>
        </div>

        <div className="p-4 lg:w-1/2">
          <p className="text-3xl font-bold sm:text-4xl">{book.title}</p>
          <div className="my-4 flex w-full items-center justify-end">
            <p className="min-w-fit">著者：</p>
            <div className="flex flex-wrap gap-x-3">
              {book.authors.map((author) => (
                <p className="text-lg font-bold sm:text-2xl" key={author}>
                  {author}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <GenreList className="gap-2" genres={genreList} variant="outline" />
          </div>

          <div className="my-6 md:my-10">{book.description}</div>

          <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
            <div className="flex flex-col gap-y-1">
              <div className="flex align-text-top">
                <p className="min-w-20">ISBN</p>
                <p>{formatIsbn(book.isbn)}</p>
              </div>
              <div className="flex align-text-top">
                <p className="min-w-20">出版社</p>
                <p>{book.publisher}</p>
              </div>
              <div className="flex align-text-top">
                <p className="min-w-20">発売日</p>
                <p>{formatDate(book.publishedDate)}</p>
              </div>
              <div className="flex align-text-top">
                <p className="min-w-20">ページ数</p>
                <p>{`${book.pageCount}ページ`}</p>
              </div>
              <div className="flex align-text-top">
                <p className="min-w-20">価格</p>
                <p>{priceToString(book.price)}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-end gap-y-4 sm:items-end">
              <div className="flex gap-x-0.5">
                <p className="mr-2">4.5</p>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
              </div>
              <Button className="w-fit rounded-full" variant="outline">
                レビューを書く
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full lg:w-3/4">
        <div className="p-6">
          <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
            <div className="flex items-center gap-x-4">
              <img className="w-16 rounded-full" src="/images/avatar02.png" alt="" />
              <div>
                <p className="text-lg">Julia</p>
                <p className="text-sm text-muted-foreground">2024年12月24日</p>
              </div>
            </div>
            <div>
              <div className="mx-4 flex gap-x-0.5">
                <p className="mr-2">4.5</p>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
              </div>
            </div>
          </div>
          <p className="p-4 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit harum
            facilis illo sint, est quos eveniet, sapiente dolor placeat tempore minus
            maxime laboriosam, aliquid eaque ad? Aut, quam corrupti.
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
            <div className="flex items-center gap-x-4">
              <img className="w-16 rounded-full" src="/images/avatar03.png" alt="" />
              <div>
                <p className="text-lg">Paul</p>
                <p className="text-sm text-muted-foreground">2024年12月24日</p>
              </div>
            </div>
            <div>
              <div className="mx-4 flex gap-x-0.5">
                <p className="mr-2">5.0</p>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
          </div>
          <p className="p-4 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit harum
            facilis illo sint, est quos eveniet, sapiente dolor placeat tempore minus
            maxime laboriosam, aliquid eaque ad? Aut, quam corrupti.
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
            <div className="flex items-center gap-x-4">
              <img className="w-16 rounded-full" src="/images/avatar06.png" alt="" />
              <div>
                <p className="text-lg">Lili</p>
                <p className="text-sm text-muted-foreground">2024年12月24日</p>
              </div>
            </div>
            <div>
              <div className="mx-4 flex gap-x-0.5">
                <p className="mr-2">3.5</p>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
              </div>
            </div>
          </div>
          <p className="p-4 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit harum
            facilis illo sint, est quos eveniet, sapiente dolor placeat tempore minus
            maxime laboriosam, aliquid eaque ad? Aut, quam corrupti.
          </p>
        </div>
      </div>
    </>
  );
}
