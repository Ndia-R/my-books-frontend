import BookmarkUpdateDialog from '@/components/bookmarks/bookmark-update-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { formatDateJP, formatTime } from '@/lib/utils';
import {
  Bookmark,
  BookmarkCreateMutation,
  BookmarkDeleteMutation,
  BookmarkUpdateMutation,
} from '@/types';
import { BookmarkIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

type Props = {
  bookmark: Bookmark;
  createMutation?: BookmarkCreateMutation;
  updateMutation?: BookmarkUpdateMutation;
  deleteMutation?: BookmarkDeleteMutation;
};

export default function BookmarkItem({
  bookmark,
  updateMutation,
  deleteMutation,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { confirmDialog } = useConfirmDialog();

  const handleClickUpdate = () => {
    setIsOpen(true);
  };

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: '削除しますか？',
      message: '削除すると元に戻りません。',
      actionLabel: '削除',
    });
    if (isCancel) return;

    deleteMutation?.mutate(bookmark.id, {
      onSuccess: () => {
        toast.success('ブックマークを削除しました');
      },
    });
  };

  return (
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
                  className="text-muted-foreground mr-2 text-xs leading-8 tracking-wide whitespace-nowrap sm:text-sm"
                  dateTime={
                    Date.parse(bookmark.updatedAt) ? bookmark.updatedAt : ''
                  }
                >
                  {formatDateJP(bookmark.updatedAt)}{' '}
                  {formatTime(bookmark.updatedAt)}
                </time>
                <Button
                  className="text-muted-foreground size-8 rounded-full"
                  variant="ghost"
                  size="icon"
                  aria-label="レビューを編集"
                  onClick={handleClickUpdate}
                >
                  <SquarePenIcon className="size-4" />
                </Button>
                <BookmarkUpdateDialog
                  bookmark={bookmark}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  updateMutation={updateMutation}
                />
                <Button
                  className="text-muted-foreground size-8 rounded-full"
                  variant="ghost"
                  size="icon"
                  aria-label="レビューを削除"
                  onClick={handleClickDelete}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 text-xs sm:text-sm">
              第 {bookmark.chapterNumber} 章 : {bookmark.chapterTitle}（
              {bookmark.pageNumber}ページ目）
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
