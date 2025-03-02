import { Card, CardContent } from '@/components/ui/card';
import { Bookmark } from '@/types';
import { BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  bookmarks: Bookmark[];
};

export default function BookmarkList({ bookmarks }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <Card>
            <CardContent className="p-4">
              <Link
                to={`/read/${bookmark.bookId}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                className="flex gap-x-4"
              >
                <div className="flex min-w-20 justify-center sm:min-w-24">
                  <img
                    className="h-24 rounded object-cover sm:h-28"
                    src={bookmark.book.imageUrl}
                    alt={bookmark.book.title}
                  />
                </div>
                <div className="flex w-full flex-col justify-center gap-y-2">
                  <div className="sm:px-4">
                    <div className="text-base font-semibold sm:text-xl">
                      {bookmark.book.title}
                      <div className="ml-2 inline-block">
                        <BookmarkIcon
                          className="size-4 text-primary"
                          style={{ fill: 'hsl(var(--primary))' }}
                        />
                      </div>
                    </div>
                    <p className="mb-1 text-xs text-muted-foreground sm:text-sm">
                      chapter {bookmark.chapterNumber}
                    </p>
                    <p className="mb-2 text-xs text-muted-foreground sm:text-sm">
                      {bookmark.chapterTitle}（{bookmark.pageNumber}ページ目）
                    </p>
                    {bookmark.note && <p>{bookmark.note}</p>}
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
