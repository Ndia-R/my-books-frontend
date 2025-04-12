import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { chapterNumberString, formatDateJP, formatTime } from '@/lib/utils';
import {
  Bookmark,
  BookmarkDeleteMutation,
  BookmarkUpdateMutation,
} from '@/types';
import { BookmarkIcon, SquarePenIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  bookmark: Bookmark;
  updateMutation: BookmarkUpdateMutation;
  deleteMutation: BookmarkDeleteMutation;
};

export default function BookmarkItem({
  bookmark,
  updateMutation,
  deleteMutation,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex gap-x-3 px-3 py-4 pr-0">
            <div className="flex min-w-20 justify-center sm:min-w-24">
              <Link
                to={`/read/${bookmark.bookId}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                className="size-fit"
              >
                <img
                  className="h-24 rounded-sm object-cover sm:h-28"
                  src={BOOK_IMAGE_BASE_URL + bookmark.book.imagePath}
                  alt={bookmark.book.title}
                />
              </Link>
            </div>
            <div className="flex w-full flex-col justify-center">
              <div className="mb-2 flex flex-col items-start gap-x-4 sm:flex-row sm:items-center">
                <Link
                  to={`/read/${bookmark.bookId}/chapter/${bookmark.chapterNumber}/page/${bookmark.pageNumber}`}
                  className="size-fit"
                >
                  <h2 className="hover:text-primary text-base font-semibold sm:text-xl">
                    {bookmark.book.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center">
                  <div className="flex size-8 items-center justify-center">
                    <BookmarkIcon className="text-primary fill-primary size-4" />
                  </div>
                  <time
                    className="text-muted-foreground mr-2 flex gap-x-1 text-xs leading-8 tracking-wide whitespace-nowrap sm:text-sm"
                    dateTime={
                      Date.parse(bookmark.createdAt) ? bookmark.createdAt : ''
                    }
                  >
                    <span>{formatDateJP(bookmark.createdAt)}</span>
                    <span>{formatTime(bookmark.createdAt)}</span>
                  </time>
                  <Button
                    className="text-muted-foreground size-8 rounded-full"
                    variant="ghost"
                    size="icon"
                    aria-label="ブックマークを編集"
                    onClick={() => setIsOpen(true)}
                  >
                    <SquarePenIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 text-xs sm:text-sm">
                {`${chapterNumberString(bookmark.chapterNumber)} : ${bookmark.chapterTitle}（
                ${bookmark.pageNumber}ページ目）`}
              </p>
              <p className="text-muted-foreground">
                {bookmark.note && <span>{bookmark.note}</span>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookmarkUpdateDialog
        bookmark={bookmark}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </>
  );
}
