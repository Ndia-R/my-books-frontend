import { Button } from '@/components/ui/button';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import { useAuth } from '@/hooks/use-auth';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { cn } from '@/lib/util';
import { Bookmark, BookmarkRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };

type Props = {
  bookmark?: Bookmark;
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  size?: 'sm' | 'md';
};

export default function BookmarkButton({
  bookmark,
  bookId,
  chapterNumber,
  pageNumber,
  size = 'md',
}: Props) {
  const { confirmDialog } = useConfirmDialog();
  const { user } = useAuth();
  const { createBookmark, deleteBookmark } = useApiBookmark();

  const queryClient = useQueryClient();

  const { mutate: createMutation } = useMutation({
    mutationFn: (requestBody: BookmarkRequest) => createBookmark(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkByBookId', bookId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkByBookId', bookId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = async () => {
    if (!user) return;

    if (bookmark) {
      if (bookmark.note) {
        const { isCancel } = await confirmDialog({
          icon: '?',
          title: 'このブックマークを削除しますか？',
          message: 'ブックマークのメモも削除されます。',
        });
        if (isCancel) return;
      }
      deleteMutation(bookmark.id);
    } else {
      const { text: note } = await confirmDialog({
        icon: 'i',
        title: 'ブックマーク',
        message:
          'このブックマークにメモを残せます。メモがなくてもブックマーク登録できます。',
        showInput: true,
        inputRows: 1,
      });
      const requestBody: BookmarkRequest = {
        bookId,
        chapterNumber,
        pageNumber,
        note,
      };
      createMutation(requestBody);
    }
  };

  return (
    <Button
      className={cn(
        'rounded-full text-muted-foreground',
        BUTTON_SIZE[size],
        bookmark && 'text-primary bg-transparent'
      )}
      variant="ghost"
      size="icon"
      onClick={handleClick}
    >
      <BookmarkIcon
        className={ICON_SIZE[size]}
        style={{
          fill: bookmark ? 'hsl(var(--primary))' : '',
        }}
      />
    </Button>
  );
}
