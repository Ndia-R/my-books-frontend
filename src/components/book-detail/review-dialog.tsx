import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { createReview } from '@/lib/action';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function ReviewDialog({ bookId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setRating(0);
    }
  }, [isOpen]);

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.animationName === 'enter') {
      setComment('');
      ref.current?.focus();
    }
  };

  const handlePost = async () => {
    if (rating === 0) {
      const { isCancel } = await confirmDialog({
        icon: '?',
        title: 'このまま投稿しますか？',
        message: '星の数が「0」のままです。',
      });
      if (isCancel) return;
    }
    if (!user) {
      await confirmDialog({
        icon: '!',
        title: 'ユーザー情報がないため投稿できません',
        message: '',
      });
      return;
    }
    await createReview({ comment, rating, bookId, userId: user.id });
    toast({ description: 'レビューを投稿しました' });
    setIsOpen(false);

    // 現在の画面にリダイレクトしてloaderを再実行してデータを更新
    navigate(0);
  };

  const handleCloseDialog = async () => {
    if (comment) {
      const { isCancel } = await confirmDialog({
        icon: '?',
        title: '本当に閉じますか？',
        message: 'コメントはまだ投稿していません。',
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
            className="rounded-full bg-transparent"
            variant="outline"
            onClick={() => user && setIsOpen(true)}
          >
            レビューを書く
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

          <Textarea ref={ref} onChange={(e) => setComment(e.currentTarget.value)} />

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
