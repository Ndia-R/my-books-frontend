import Rating from '@/components/shared/rating';
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
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { ReviewCreateMutation, ReviewRequest } from '@/types';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  bookId: string;
  page: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createMutation: ReviewCreateMutation;
};

export default function ReviewCreateDialog({
  bookId,
  isOpen,
  setIsOpen,
  createMutation,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment('');
    }
  }, [isOpen]);

  const handleClickPost = async () => {
    if (rating === 0) {
      const { isCancel } = await confirmDialog({
        icon: 'question',
        title: 'このまま投稿しますか？',
        message: '星の数が「0」のままです。',
        actionLabel: '投稿',
      });
      if (isCancel) return;
    }

    const requestBody: ReviewRequest = {
      bookId,
      comment,
      rating,
    };

    createMutation.mutate(requestBody, {
      onSuccess: () => {
        toast.success('レビューを投稿しました');
      },
      onError: () => {
        toast.error('レビュー投稿に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });
  };

  const handleClickCancel = async () => {
    if (comment) {
      const { isCancel } = await confirmDialog({
        icon: 'question',
        title: 'キャンセルして閉じますか？',
        message: 'コメントはまだ投稿していません。',
        persistent: true,
      });
      if (isCancel) return;
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-3/4 max-w-[600px] min-w-[360px]"
        onEscapeKeyDown={handleClickCancel}
        onPointerDownOutside={handleClickCancel}
      >
        <DialogTitle className="font-semibold">レビュー</DialogTitle>

        <DialogDescription className="text-muted-foreground text-sm">
          素敵な感想を伝えましょう！
        </DialogDescription>

        <div className="absolute top-4 right-6">
          <Rating rating={rating} onChange={setRating} />
          <p className="text-muted-foreground mt-0.5 text-center text-sm">
            星をクリックして決定
          </p>
        </div>

        <Textarea
          spellCheck={false}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
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
            disabled={comment === '' || createMutation.isPending}
            onClick={handleClickPost}
          >
            {createMutation.isPending ? (
              <Loader2Icon
                className="animate-spin"
                aria-label="レビュー投稿中"
              />
            ) : (
              '投稿'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
