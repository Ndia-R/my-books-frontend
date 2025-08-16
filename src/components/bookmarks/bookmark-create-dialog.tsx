import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { BookmarkCreateMutation, BookmarkRequest } from '@/types';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createMutation: BookmarkCreateMutation;
};

export default function BookmarkCreateDialog({
  bookId,
  chapterNumber,
  pageNumber,
  isOpen,
  setIsOpen,
  createMutation,
}: Props) {
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNote('');
    }
  }, [isOpen]);

  const handleClickCreate = () => {
    const requestBody: BookmarkRequest = {
      bookId,
      chapterNumber,
      pageNumber,
      note,
    };

    createMutation.mutate(requestBody, {
      onSuccess: () => {
        toast.success('ブックマークを作成しました');
      },
      onError: () => {
        toast.error('ブックマークの作成に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-3/4 max-w-[600px] min-w-[360px]"
        onEscapeKeyDown={handleClickCancel}
        onPointerDownOutside={handleClickCancel}
      >
        <DialogTitle className="font-semibold">ブックマーク</DialogTitle>

        <DialogDescription className="text-muted-foreground text-sm">
          このブックマークにメモを残せます。メモが未入力でもブックマーク登録できます。
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
            disabled={createMutation.isPending}
            onClick={handleClickCreate}
          >
            {createMutation.isPending ? (
              <Loader2Icon
                className="animate-spin"
                aria-label="ブックマーク作成中"
              />
            ) : (
              '作成'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
