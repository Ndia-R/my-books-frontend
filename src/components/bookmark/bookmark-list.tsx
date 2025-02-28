import BookPagination from '@/components/book-list/book-pagination';
import { Card, CardContent } from '@/components/ui/card';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  page: number;
};

export default function BookmarkList({ page }: Props) {
  const { getBookmarkPage } = useApiBookmark();

  const { data: bookmarkPage } = useSuspenseQuery({
    queryKey: ['getBookmarkPage', page],
    queryFn: () => getBookmarkPage(page),
  });

  return (
    <>
      <div className="flex flex-col gap-y-4 pb-4">
        <p className="text-right">
          {bookmarkPage.totalItems}
          <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
        </p>
        <ul className="flex flex-col gap-y-2">
          {bookmarkPage.bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <Card>
                <CardContent className="p-3">
                  <Link
                    to={`/read/${bookmark.bookId}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                    className="flex gap-x-2"
                  >
                    <div className="flex w-24 justify-center">
                      <img
                        className="h-20 rounded object-cover sm:h-24"
                        src={bookmark.book.imageUrl}
                        alt={bookmark.book.title}
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center gap-y-2">
                      <div className="text-base font-semibold sm:text-xl">
                        {bookmark.book.title}
                        <div className="ml-2 inline-block">
                          <BookmarkIcon
                            className="size-4 text-primary"
                            style={{ fill: 'hsl(var(--primary))' }}
                          />
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="mb-1 text-xs text-muted-foreground sm:text-sm">
                          chapter {bookmark.chapterNumber}
                        </p>
                        <p className="mb-2 text-xs text-muted-foreground sm:text-sm">
                          {bookmark.chapterTitle}（{bookmark.pageNumber}ページ目）
                        </p>
                        {bookmark.note && <p>「{bookmark.note}」</p>}
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <BookPagination totalPages={bookmarkPage.totalPages} />
      </div>
    </>
  );
}
