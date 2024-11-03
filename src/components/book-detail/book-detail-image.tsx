import FavoriteButton from '@/components/favorite-button';
import { formatDate, priceToString } from '@/lib/util';
import { Book } from '@/types/book';

type Props = {
  book: Book;
};

export default function BookDetailImage({ book }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex min-w-64 justify-center">
        <img className="h-80 rounded object-cover" src={book.imageUrl} alt={book.title} />
      </div>

      <div className="flex items-center gap-x-4">
        <FavoriteButton book={book} />
      </div>

      <div className="flex flex-col gap-y-1 p-2">
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
          <p>{book.price === 0 ? '-' : priceToString(book.price)}</p>
        </div>
      </div>
    </div>
  );
}
