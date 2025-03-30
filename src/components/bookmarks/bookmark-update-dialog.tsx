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
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';

type Props = {
  bookmark: Bookmark;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateMutation?: BookmarkUpdateMutation;
  deleteMutation?: BookmarkDeleteMutation;
};

export default function BookmarkUpdateDialog({
  bookmark,
  isOpen,
  setIsOpen,
  updateMutation,
  deleteMutation,
}: Props) {
  const [note, setNote] = useState('');

  const location = useLocation();

  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      setNote(bookmark.note);
    }
  }, [isOpen, bookmark.note]);

  const handleDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: 'このブックマークを削除しますか？',
      message: 'ブックマークのメモも削除されます。',
    });
    if (isCancel) return;

    deleteMutation?.mutate(bookmark.id, {
      onSuccess: () => {
        toast.success('ブックマークを削除しました');
        setIsOpen(false);
      },
      onError: () => {
        toast.error('ブックマークの削除に失敗しました', {
          description: '管理者へ連絡してください。',
          duration: 5000,
        });
        setIsOpen(false);
      },
    });
  };

  const handleUpdate = () => {
    const requestBody: BookmarkRequest = {
      bookId: bookmark.bookId,
      chapterNumber: bookmark.chapterNumber,
      pageNumber: bookmark.pageNumber,
      note,
    };
    updateMutation?.mutate(
      { id: bookmark.id, requestBody },
      {
        onSuccess: () => {
          toast.success('ブックマークのメモを更新しました');
          setIsOpen(false);
        },
        onError: () => {
          toast.error('ブックマークのメモを更新に失敗しました', {
            description: '管理者へ連絡してください。',
            duration: 5000,
          });
          setIsOpen(false);
        },
      }
    );
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-3/4 max-w-[600px] min-w-[360px] p-4 sm:p-6"
        onEscapeKeyDown={handleCloseDialog}
        onPointerDownOutside={handleCloseDialog}
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
            className="min-w-24 rounded-full"
            variant="ghost"
            onClick={handleCloseDialog}
          >
            キャンセル
          </Button>
          {location.pathname.includes('read') && (
            <Button
              className="min-w-24 rounded-full"
              variant="outline"
              onClick={handleDelete}
            >
              削除
            </Button>
          )}
          <Button className="min-w-24 rounded-full" onClick={handleUpdate}>
            更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
