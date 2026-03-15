import type { Bookmark } from '@/entities/bookmark/model/types';
import { buildPath } from '@/shared/api/url-builder';
import { BOOK_IMAGE_BASE_URL } from '@/shared/config/constants';
import {
  chapterNumberString,
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { Card, CardContent } from '@/shared/ui/card';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = {
  bookmark: Bookmark;
  action?: ReactNode;
  onPrefetch?: () => void;
};

export default function BookmarkItem({ bookmark, action, onPrefetch }: Props) {
  const bookReadPath = buildPath(
    '/read-content/:bookId/chapter/:chapterNumber/page/:pageNumber',
    {
      bookId: bookmark.book.id,
      chapterNumber: bookmark.chapterNumber,
      pageNumber: bookmark.pageNumber,
    }
  );

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link
              className="size-fit"
              to={bookReadPath}
              aria-label={`${bookmark.book.title}のブックマークページへ移動`}
              onMouseEnter={onPrefetch}
              onFocus={onPrefetch}
            >
              <img
                className="h-24 rounded-xs object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + bookmark.book.imagePath}
                alt={bookmark.book.title}
              />
            </Link>
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-x-2">
                <Link
                  className="size-fit"
                  to={bookReadPath}
                  aria-label={`${bookmark.book.title}のブックマークページへ移動`}
                  onMouseEnter={onPrefetch}
                  onFocus={onPrefetch}
                >
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {bookmark.book.title}
                  </h2>
                </Link>

                {action}
              </div>

              <time
                className="text-muted-foreground mr-1 text-sm"
                dateTime={
                  Date.parse(bookmark.updatedAt) ? bookmark.updatedAt : ''
                }
                title={`${formatDateJP(bookmark.updatedAt)} ${formatTime(bookmark.updatedAt)}`}
              >
                {formatRelativeTime(bookmark.updatedAt)}
              </time>
            </div>

            <p className="text-muted-foreground text-sm">
              {`${chapterNumberString(bookmark.chapterNumber)}:${bookmark.chapterTitle}(${bookmark.pageNumber}ページ目)`}
            </p>

            <p className="text-muted-foreground">
              {bookmark.note && <span>{bookmark.note}</span>}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
