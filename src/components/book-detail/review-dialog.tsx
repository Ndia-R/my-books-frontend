import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';

export default function ReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (commentRef.current) {
        commentRef.current.value = '';
      }
      setRating(0);
    }
  }, [isOpen]);

  const handlePost = () => {
    toast({ description: 'レビューを投稿しました' });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        className="w-1/2 min-w-[360px] max-w-[600px]"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button className="rounded-full" variant="outline">
            レビューを書く
          </Button>
        </DialogTrigger>

        <DialogContent>
          <div className="mb-3 flex items-start justify-between">
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

          <Textarea className="mb-6" ref={commentRef} />

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
