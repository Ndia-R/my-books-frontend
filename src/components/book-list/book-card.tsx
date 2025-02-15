import FavoriteCountIcon from '@/components/favorite-count-icon';
import ReviewCountIcon from '@/components/review-count-icon';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateJP } from '@/lib/util';
import { Book } from '@/types';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <>
      <Card className="border-card-foreground/5 bg-card/70">
        <CardContent className="relative flex w-40 flex-col items-center px-3 pb-2 pt-4 sm:w-48 sm:px-4">
          <Link className="flex justify-center" to={`/book/${book.id}`}>
            <img
              className="h-44 rounded object-cover sm:h-52"
              src={book.imageUrl}
              alt={book.title}
            />
          </Link>
          <Link
            className="mt-1 flex h-8 w-full items-center justify-center text-xs hover:text-primary sm:h-10 sm:text-sm"
            to={`/book/${book.id}`}
          >
            <p className="line-clamp-2 text-center">{book.title}</p>
          </Link>
          <div className="mt-1 flex w-full flex-col items-center gap-y-1">
            <p className="text-xs tracking-wide text-muted-foreground">
              {formatDateJP(book.publishedDate)}
            </p>
            <div className="flex justify-around gap-x-4">
              <ReviewCountIcon size="sm" bookId={book.id} />
              <FavoriteCountIcon size="sm" bookId={book.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
