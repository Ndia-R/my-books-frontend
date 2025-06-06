import FavoriteCountIcon from '@/components/count-icon/favorite-count-icon';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { formatDateJP, formatTime } from '@/lib/utils';
import { Favorite } from '@/types';
import { Link } from 'react-router';

type Props = {
  favorite: Favorite;
};

export default function FavoriteItem({ favorite }: Props) {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-3 px-3 py-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link to={`/book/${favorite.book.id}`} className="size-fit">
              <img
                className="h-24 rounded-xs object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + favorite.book.imagePath}
                alt={favorite.book.title}
              />
            </Link>
          </div>
          <div className="flex w-full flex-col justify-center">
            <div className="mb-2 flex flex-col items-start gap-x-4 sm:flex-row sm:items-center">
              <Link to={`/book/${favorite.book.id}`} className="size-fit">
                <h2 className="hover:text-primary text-base font-semibold sm:text-xl">
                  {favorite.book.title}
                </h2>
              </Link>
              <div className="flex items-center">
                <FavoriteCountIcon
                  bookId={favorite.bookId}
                  isFavorite={true}
                  count={1}
                />
                <time
                  className="text-muted-foreground mr-2 flex gap-x-1 text-xs leading-8 tracking-wide whitespace-nowrap sm:text-sm"
                  dateTime={
                    Date.parse(favorite.createdAt) ? favorite.createdAt : ''
                  }
                >
                  <span>{formatDateJP(favorite.createdAt)}</span>
                  <span>{formatTime(favorite.createdAt)}</span>
                </time>
              </div>
            </div>
            <div className="text-muted-foreground mb-4 flex w-full flex-wrap items-center gap-x-3">
              <p className="text-xs">著者</p>
              {favorite.book.authors.map((author) => (
                <p className="text-sm" key={author}>
                  {author}
                </p>
              ))}
            </div>
            <p className="text-muted-foreground">{favorite.book.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
