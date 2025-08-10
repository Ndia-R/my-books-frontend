import Rating from '@/components/rating';
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
  Review,
  ReviewDeleteMutation,
  ReviewRequest,
  ReviewUpdateMutation,
} from '@/types';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  review: Review;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateMutation: ReviewUpdateMutation;
  deleteMutation: ReviewDeleteMutation;
};

export default function ReviewUpdateDialog({
  review,
  isOpen,
  setIsOpen,
  updateMutation,
  deleteMutation,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [isOpen, review.comment, review.rating]);

  const handleClickCancel = async () => {
    setIsOpen(false);
  };

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: '削除しますか？',
      message: '削除すると元に戻りません。',
      actionLabel: '削除',
    });
    if (isCancel) return;

    deleteMutation.mutate(review.id, {
      onSuccess: () => {
        toast.success('レビューを削除しました');
      },
      onError: () => {
        toast.error('レビューの削除に失敗しました', { duration: 5000 });
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });
  };

  const handleClickUpdate = () => {
    const requestBody: ReviewRequest = {
      bookId: review.book.id,
      comment,
      rating,
    };

    updateMutation.mutate(
      { reviewId: review.id, requestBody },
      {
        onSuccess: () => {
          toast.success('レビューを更新しました');
        },
        onError: () => {
          toast.error('レビューの更新に失敗しました', { duration: 5000 });
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
        <div className="flex items-start justify-between">
          <div>
            <DialogTitle className="leading-10 font-semibold">
              レビュー
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
              レビュー内容を編集できます。
            </DialogDescription>
          </div>
          <div>
            <Rating rating={rating} onChange={setRating} />
            <p className="text-muted-foreground text-center text-xs sm:text-sm">
              星をクリックして決定
            </p>
          </div>
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
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={handleClickDelete}
          >
            {deleteMutation.isPending ? (
              <Loader2Icon className="animate-spin" aria-label="レビュー削除中" />
            ) : (
              '削除'
            )}
          </Button>
          <Button
            className="min-w-24"
            disabled={comment === '' || updateMutation.isPending}
            onClick={handleClickUpdate}
          >
            {updateMutation.isPending ? (
              <Loader2Icon className="animate-spin" aria-label="レビュー更新中" />
            ) : (
              '更新'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
