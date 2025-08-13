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
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link to={`/book/${favorite.book.id}`} className="size-fit">
              <img
                className="h-24 rounded-xs object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + favorite.book.imagePath}
                alt={favorite.book.title}
              />
            </Link>
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-x-2">
                <Link to={`/book/${favorite.book.id}`} className="size-fit">
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {favorite.book.title}
                  </h2>
                </Link>
                <FavoriteCountIcon
                  bookId={favorite.book.id}
                  isFavorite={true}
                  count={1}
                  hideCount={true}
                />
              </div>

              <div className="flex items-center">
                <time
                  className="text-muted-foreground mr-1 flex gap-x-1 text-sm"
                  dateTime={
                    Date.parse(favorite.createdAt) ? favorite.createdAt : ''
                  }
                >
                  <span>{formatDateJP(favorite.createdAt)}</span>
                  <span>{formatTime(favorite.createdAt)}</span>
                </time>
              </div>
            </div>
            <p className="text-muted-foreground flex gap-x-3 text-sm">
              <span>著者</span>
              {favorite.book.authors.map((author) => (
                <span key={author}>{author}</span>
              ))}
            </p>
            <p className="text-muted-foreground">{favorite.book.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
