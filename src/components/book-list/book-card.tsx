import FavoriteButton from '@/components/favorite-button';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from '@/types/book';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <>
      <Card>
        <CardContent className="relative flex w-40 flex-col items-center px-3 pb-2 pt-6 sm:w-48 sm:px-4">
          <FavoriteButton
            className="absolute bottom-8 right-2 sm:bottom-10"
            book={book}
          />
          <Link className="flex justify-center" to={`/book/${book.id}`}>
            <img
              className="h-44 rounded object-cover sm:h-52"
              src={book.imageUrl}
              alt={book.title}
            />
          </Link>
          <div className="w-full">
            <p className="mt-2 text-xs text-muted-foreground">{book.publishedDate}</p>
          </div>
          <Link
            className="flex h-8 w-full items-center justify-center text-xs hover:text-primary sm:h-10 sm:text-sm"
            to={`/book/${book.id}`}
          >
            <p className="line-clamp-2 text-center">{book.title}</p>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
