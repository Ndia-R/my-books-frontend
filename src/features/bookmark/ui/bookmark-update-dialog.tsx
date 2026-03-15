import type {
  Bookmark,
  BookmarkDeleteMutation,
  BookmarkRequest,
  BookmarkUpdateMutation,
  BookmarkUpdateParams,
} from '@/entities/bookmark';
import { TOAST_ERROR_DURATION } from '@/shared/config/constants';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Textarea } from '@/shared/ui/textarea';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
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
  const [note, setNote] = useState(bookmark.note);
  const { confirmDialog } = useConfirmDialog();

  const handleClickUpdate = () => {
    const requestBody: BookmarkRequest = {
      bookId: bookmark.book.id,
      chapterNumber: bookmark.chapterNumber,
      pageNumber: bookmark.pageNumber,
      note,
    };
    const updateParams: BookmarkUpdateParams = {
      bookmarkId: bookmark.id,
      requestBody,
    };

    updateMutation.mutate(updateParams, {
      onSuccess: () => {
        toast.success('ブックマークのメモを更新しました');
      },
      onError: () => {
        toast.error('ブックマークのメモを更新に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
        setNote(note);
      },
    });
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
        toast.error('ブックマークの削除に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
        setNote(bookmark.note);
      },
    });
  };

  const handleClickCancel = () => {
    setIsOpen(false);
    setNote(bookmark.note);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClickCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-3/4 max-w-150 min-w-90"
        showCloseButton={false}
        onEscapeKeyDown={handleClickCancel}
        onPointerDownOutside={handleClickCancel}
      >
        <DialogTitle className="font-semibold">ブックマーク</DialogTitle>

        <DialogDescription className="text-muted-foreground text-sm">
          メモを編集できます。メモが未入力でもブックマーク登録は消えません。
        </DialogDescription>

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
              <Loader2Icon
                className="animate-spin"
                aria-label="ブックマーク削除中"
              />
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
              <Loader2Icon
                className="animate-spin"
                aria-label="ブックマーク更新中"
              />
            ) : (
              '更新'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
