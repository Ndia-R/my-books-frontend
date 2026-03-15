import type { Favorite } from '@/entities/favorite/model/types';
import { buildPath } from '@/shared/api/url-builder';
import { BOOK_IMAGE_BASE_URL } from '@/shared/config/constants';
import usePrefetch from '@/shared/hooks/use-prefetch';
import {
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { Card, CardContent } from '@/shared/ui/card';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = {
  favorite: Favorite;
  action?: ReactNode;
};

export default function FavoriteItem({ favorite, action }: Props) {
  const { prefetchBookDetail } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookDetail(favorite.book.id);
  };

  const bookDetailPath = buildPath('/books/:bookId', {
    bookId: favorite.book.id,
  });

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link
              className="size-fit"
              to={bookDetailPath}
              aria-label={`${favorite.book.title}の詳細ページへ移動`}
              onMouseEnter={handlePrefetch}
              onFocus={handlePrefetch}
            >
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
                <Link
                  className="size-fit"
                  to={bookDetailPath}
                  aria-label={`${favorite.book.title}の詳細ページへ移動`}
                  onMouseEnter={handlePrefetch}
                  onFocus={handlePrefetch}
                >
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {favorite.book.title}
                  </h2>
                </Link>

                {action}
              </div>

              <time
                className="text-muted-foreground mr-1 text-sm"
                dateTime={
                  Date.parse(favorite.updatedAt) ? favorite.updatedAt : ''
                }
                title={`${formatDateJP(favorite.updatedAt)} ${formatTime(favorite.updatedAt)}`}
              >
                {formatRelativeTime(favorite.updatedAt)}
              </time>
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
