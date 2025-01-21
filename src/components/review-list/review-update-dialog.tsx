import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { updateReview } from '@/lib/action';
import { Review } from '@/types';
import { Loader2Icon, SquarePenIcon } from 'lucide-react';
import React, { useEffect, useRef, useState, useTransition } from 'react';

type Props = {
  bookId: string;
  review: Review;
  refetch: () => void;
};

export default function ReviewUpdateDialog({ bookId, review, refetch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const { toast } = useToast();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();

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
    const isSuccess = await updateReview({ bookId, comment, rating });
    if (!isSuccess) {
      toast({
        title: 'レビュー投稿に失敗しました',
        description: '管理者へ連絡してください',
        variant: 'destructive',
        duration: 5000,
      });
      setIsOpen(false);
      return;
    }

    toast({ description: 'レビューを投稿しました' });
    setIsOpen(false);

    startTransition(() => {
      refetch();
    });
  };

  const handleCloseDialog = async () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="size-8 rounded-full text-muted-foreground"
            variant="ghost"
            size="icon"
            disabled={isPending}
            onClick={() => user && setIsOpen(true)}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <SquarePenIcon className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
      </Tooltip>

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
            <Button
              className="rounded-full"
              disabled={comment === '' ? true : false}
              onClick={handlePost}
            >
              投稿する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
