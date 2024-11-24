import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';

export default function ReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (isOpen) {
      if (commentRef.current) {
        commentRef.current.value = '';
      }
      setRating(0);
    }
  }, [isOpen]);

  const handlePost = async () => {
    if (rating === 0) {
      const { isCancel: isCancelStar } = await confirmDialog({
        icon: '?',
        title: '星が「0」ですが投稿しますか？',
      });
      if (isCancelStar) return;
    }

    if (commentRef.current && !commentRef.current.value) {
      const { isAction: isCancelComment } = await confirmDialog({
        icon: 'i',
        title: 'コメントが未入力です',
        message: 'コメントが未入力のまま投稿はできません。',
        actionOnly: true,
        persistent: true,
      });
      if (isCancelComment) return;
    }

    toast({ description: 'レビューを投稿しました' });
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
          onPointerDownOutside={() => setIsOpen(false)}
          onEscapeKeyDown={() => console.log('ESC')}
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
                {rating === 0 ? '星をクリックで決定' : ''}
              </p>
            </div>
          </div>

          <Textarea ref={commentRef} />

          <div className="flex justify-center">
            <Button className="w-48 rounded-full" onClick={handlePost}>
              投稿する
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
