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
import { Review, ReviewRequest, ReviewUpdateMutation } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  review: Review;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateMutation?: ReviewUpdateMutation;
};

export default function ReviewUpdateDialog({
  review,
  isOpen,
  setIsOpen,
  updateMutation,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isOpen) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [isOpen, review.comment, review.rating]);

  const handleClickUpdate = () => {
    const requestBody: ReviewRequest = {
      bookId: review.bookId,
      comment,
      rating,
    };
    updateMutation?.mutate(
      { id: review.id, requestBody },
      {
        onSuccess: () => {
          toast.success('レビューを更新しました');
          setIsOpen(false);
        },
        onError: () => {
          toast.error('レビューの更新に失敗しました', {
            description: '管理者へ連絡してください。',
            duration: 5000,
          });
          setIsOpen(false);
        },
      }
    );
  };

  const handleClickCancel = async () => {
    setIsOpen(false);
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
            className="min-w-24 rounded-full"
            variant="ghost"
            onClick={handleClickCancel}
          >
            キャンセル
          </Button>
          <Button
            className="min-w-24 rounded-full"
            disabled={comment === ''}
            onClick={handleClickUpdate}
          >
            更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
