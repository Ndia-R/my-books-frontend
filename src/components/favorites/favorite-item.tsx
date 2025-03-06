import { Card, CardContent } from '@/components/ui/card';
import { formatDateJP, formatTime } from '@/lib/util';
import { Favorite } from '@/types';
import { HeartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  favorite: Favorite;
};

export default function FavoriteItem({ favorite }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link to={`/book/${favorite.book.id}`} className="size-fit">
              <img
                className="h-24 rounded object-cover sm:h-28"
                src={favorite.book.imageUrl}
                alt={favorite.book.title}
              />
            </Link>
          </div>
          <div className="flex w-full flex-col justify-center">
            <div className="mb-2 flex flex-col items-start gap-x-4 sm:flex-row sm:items-center">
              <Link to={`/book/${favorite.book.id}`} className="size-fit">
                <p className="text-base font-semibold hover:text-primary sm:text-xl">
                  {favorite.book.title}
                </p>
              </Link>
              <div className="flex items-center">
                <HeartIcon
                  className="size-4 text-primary"
                  style={{ fill: 'hsl(var(--primary))' }}
                />
                <p className="mx-2 whitespace-nowrap text-xs leading-8 tracking-wide text-muted-foreground sm:text-sm">
                  {formatDateJP(favorite.updatedAt)} {formatTime(favorite.updatedAt)}
                </p>
              </div>
            </div>
            <div className="mb-4 flex w-full flex-wrap items-center gap-x-3 text-muted-foreground">
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
