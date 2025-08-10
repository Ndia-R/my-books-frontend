import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import {
  Bookmark,
  BookmarkDeleteMutation,
  BookmarkRequest,
  BookmarkUpdateMutation,
} from '@/types';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  bookmark: Bookmark;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateMutation: BookmarkUpdateMutation;
  deleteMutation: BookmarkDeleteMutation;
};

export default function BookmarkUpdateDialog({
  bookmark,
  isOpen,
  setIsOpen,
  updateMutation,
  deleteMutation,
}: Props) {
  const [note, setNote] = useState('');
  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      setNote(bookmark.note);
    }
  }, [isOpen, bookmark.note]);

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: 'このブックマークを削除しますか？',
      message: 'ブックマークのメモも削除されます。',
    });
    if (isCancel) return;

    deleteMutation.mutate(bookmark.id, {
      onSuccess: () => {
        toast.success('ブックマークを削除しました');
      },
      onError: () => {
        toast.error('ブックマークの削除に失敗しました', { duration: 5000 });
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });
  };

  const handleClickUpdate = () => {
    const requestBody: BookmarkRequest = {
      bookId: bookmark.book.id,
      chapterNumber: bookmark.chapterNumber,
      pageNumber: bookmark.pageNumber,
      note,
    };
    updateMutation.mutate(
      { bookmarkId: bookmark.id, requestBody },
      {
        onSuccess: () => {
          toast.success('ブックマークのメモを更新しました');
        },
        onError: () => {
          toast.error('ブックマークのメモを更新に失敗しました', {
            duration: 5000,
          });
        },
        onSettled: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-3/4 max-w-[600px] min-w-[360px] p-4 sm:p-6"
        onEscapeKeyDown={handleClickCancel}
        onPointerDownOutside={handleClickCancel}
      >
        <div>
          <DialogTitle className="leading-10 font-semibold">
            ブックマーク
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
            メモを編集できます。メモが未入力でもブックマーク登録は消えません。
          </DialogDescription>
        </div>

        <Textarea
          spellCheck={false}
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
        />

        <DialogFooter className="gap-y-4 sm:gap-y-0">
          <Button
            className="min-w-24"
            variant="ghost"
            onClick={handleClickCancel}
          >
            キャンセル
          </Button>
          <Button
            className="min-w-24"
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={handleClickDelete}
          >
            {deleteMutation.isPending ? (
              <Loader2Icon className="animate-spin" aria-label="ブックマーク削除中" />
            ) : (
              '削除'
            )}
          </Button>
          <Button
            className="min-w-24"
            disabled={updateMutation.isPending}
            onClick={handleClickUpdate}
          >
            {updateMutation.isPending ? (
              <Loader2Icon className="animate-spin" aria-label="ブックマーク更新中" />
            ) : (
              '更新'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
