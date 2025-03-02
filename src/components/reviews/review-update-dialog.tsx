import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useApiRevew } from '@/hooks/api/use-api-review';
import { useToast } from '@/hooks/use-toast';
import { Review, ReviewRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  bookId: string;
  page: number;
  review: Review;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function ReviewUpdateDialog({
  bookId,
  page,
  review,
  isOpen,
  setIsOpen,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const { updateReview } = useApiRevew();
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: ({ id, requestBody }: { id: number; requestBody: ReviewRequest }) =>
      updateReview(id, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReviewPage', bookId, page] });
      queryClient.invalidateQueries({ queryKey: ['getBookDetailsById', bookId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (isOpen) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [isOpen, review.comment, review.rating]);

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.animationName === 'enter') {
      ref.current?.focus();
    }
  };

  const handlePost = async () => {
    const requestBody: ReviewRequest = { bookId, comment, rating };
    updateMutation.mutate(
      { id: review.id, requestBody },
      {
        onSuccess: () => {
          toast({ title: 'レビューを投稿しました' });
          setIsOpen(false);
        },
        onError: () => {
          toast({
            title: 'レビュー投稿に失敗しました',
            description: '管理者へ連絡してください。',
            variant: 'destructive',
            duration: 5000,
          });
          setIsOpen(false);
        },
      }
    );
  };

  const handleCloseDialog = async () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-3/4 min-w-[360px] max-w-[600px] p-4 sm:p-6"
        onEscapeKeyDown={handleCloseDialog}
        onPointerDownOutside={handleCloseDialog}
        onAnimationStart={handleAnimationStart}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold leading-10">レビュー</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              素敵な感想を伝えましょう！
            </p>
          </div>
          <div>
            <Rating rating={rating} onChange={setRating} />
            <p className="text-center text-xs text-muted-foreground sm:text-sm">
              星をクリックして決定
            </p>
          </div>
        </div>

        <Textarea
          ref={ref}
          spellCheck={false}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />

        <DialogFooter>
          <Button className="rounded-full" variant="ghost" onClick={handleCloseDialog}>
            閉じる
          </Button>
          <Button className="rounded-full" disabled={comment === ''} onClick={handlePost}>
            投稿する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
