import Rating from '@/shared/ui/rating';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Textarea } from '@/shared/ui/textarea';
import { TOAST_ERROR_DURATION } from '@/shared/config/constants';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import type {
  Review,
  ReviewDeleteMutation,
  ReviewRequest,
  ReviewUpdateMutation,
  ReviewUpdateParams,
} from '@/entities/review/model/types';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
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
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const { confirmDialog } = useConfirmDialog();

  const handleClickUpdate = () => {
    const requestBody: ReviewRequest = {
      bookId: review.book.id,
      comment,
      rating,
    };
    const updateParams: ReviewUpdateParams = {
      reviewId: review.id,
      requestBody,
    };

    updateMutation.mutate(updateParams, {
      onSuccess: () => {
        toast.success('レビューを更新しました');
      },
      onError: () => {
        toast.error('レビューの更新に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
        setRating(rating);
        setComment(comment);
      },
    });
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
        toast.error('レビューの削除に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
      onSettled: () => {
        setIsOpen(false);
        setRating(review.rating);
        setComment(review.comment);
      },
    });
  };

  const handleClickCancel = () => {
    setIsOpen(false);
    setRating(review.rating);
    setComment(review.comment);
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
        <DialogTitle className="font-semibold">レビュー</DialogTitle>

        <DialogDescription className="text-muted-foreground text-sm">
          内容を編集できます
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
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={handleClickDelete}
          >
            {deleteMutation.isPending ? (
              <Loader2Icon
                className="animate-spin"
                aria-label="レビュー削除中"
              />
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
              <Loader2Icon
                className="animate-spin"
                aria-label="レビュー更新中"
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
