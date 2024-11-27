import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useRef, useState } from 'react';

export default function ReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      setRating(0);
    }
  }, [isOpen]);

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.animationName === 'enter' && ref.current) {
      setText('');
      ref.current.focus();
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

    toast({ description: 'レビューを投稿しました' });
    setIsOpen(false);
  };

  const handleCloseDialog = async () => {
    if (text) {
      const { isCancel } = await confirmDialog({
        icon: '?',
        title: '本当に閉じますか？',
        message: '入力されているコメントはまだ投稿していません。',
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
            className="rounded-full"
            variant="outline"
            onClick={() => setIsOpen(true)}
          >
            レビューを書く
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ログインしてこの本のレビューを書きましょう</p>
        </TooltipContent>
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
                {rating === 0 ? 'クリックで星を決定' : ''}
              </p>
            </div>
          </div>

          <Textarea ref={ref} onChange={(e) => setText(e.currentTarget.value)} />

          <DialogFooter>
            <Button className="rounded-full" variant="ghost" onClick={handleCloseDialog}>
              閉じる
            </Button>
            <Button
              className="rounded-full"
              disabled={text === '' ? true : false}
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
