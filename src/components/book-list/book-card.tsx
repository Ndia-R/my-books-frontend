import FavoriteButton from '@/components/favorite-button';
import Card from '@/components/ui/card';
import { Book } from '@/types/book';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <>
      <Card className="flex w-40 flex-col gap-2 px-3 pb-2 pt-6 sm:w-48 sm:px-4 sm:pb-2 sm:pt-4">
        <Link className="flex justify-center" to={`/book/${book.id}`}>
          <img
            className="h-44 rounded object-cover sm:h-52"
            src={book.imageUrl}
            alt={book.title}
          />
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{book.publishedDate}</p>
          <FavoriteButton book={book} />
        </div>
        <Link
          className="line-clamp-2 h-8 w-full px-2 text-center text-xs hover:text-primary sm:h-10 sm:text-sm"
          to={`/book/${book.id}`}
        >
          {book.title}
        </Link>
      </Card>
    </>
  );
}
