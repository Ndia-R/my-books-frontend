import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { createReview } from '@/lib/action';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState, useTransition } from 'react';

type Props = {
  bookId: string;
  refetch: () => void;
};

export default function ReviewCreateDialog({ bookId, refetch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment('');
    }
  }, [isOpen]);

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.animationName === 'enter') {
      ref.current?.focus();
    }
  };

  const handlePost = async () => {
    if (rating === 0) {
      const { isCancel } = await confirmDialog({
        icon: '?',
        title: 'このまま投稿しますか？',
        message: '星の数が「0」のままです。',
        actionLabel: '投稿する',
      });
      if (isCancel) return;
    }

    const isSuccess = await createReview({ comment, rating, bookId });
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
    if (comment) {
      const { isCancel } = await confirmDialog({
        icon: '?',
        title: '本当に閉じますか？',
        message: 'コメントはまだ投稿していません。',
        actionLabel: '閉じる',
        persistent: true,
      });
      if (isCancel) return;
    }
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-44 rounded-full bg-transparent"
            variant="outline"
            disabled={isPending}
            onClick={() => user && setIsOpen(true)}
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : 'レビューを書く'}
          </Button>
        </TooltipTrigger>
        {!user && (
          <TooltipContent>ログインしてこの本の「レビュー」を書きましょう</TooltipContent>
        )}
      </Tooltip>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-1/2 min-w-[360px] max-w-[600px] p-4 md:p-6"
          onEscapeKeyDown={handleCloseDialog}
          onPointerDownOutside={handleCloseDialog}
          onAnimationStart={handleAnimationStart}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold leading-10">レビュー</p>
              <p className="text-xs text-muted-foreground md:text-sm">
                素敵な感想を伝えましょう！
              </p>
            </div>
            <div>
              <Rating rating={rating} onChange={setRating} />
              <p className="text-center text-xs text-muted-foreground md:text-sm">
                {rating === 0 ? '星をクリックして決定' : ''}
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
