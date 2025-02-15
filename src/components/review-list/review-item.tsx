import Rating from '@/components/rating';
import ReviewUpdateDialog from '@/components/review-list/review-update-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { deleteReview } from '@/lib/action';
import { formatDateJP, formatTime } from '@/lib/util';
import { Review } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  review: Review;
  bookId: string;
  queryKey: unknown[];
};

export default function ReviewItem({ review, bookId, queryKey }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const { confirmDialog } = useConfirmDialog();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (bookId: string) => deleteReview(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['getReviewSummary', bookId] });
    },
  });

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: '!',
      title: '削除しますか？',
      message: '削除すると元に戻りません。',
      actionLabel: '削除する',
    });
    if (isCancel) return;

    mutate(bookId, {
      onSuccess: () => {
        toast({ description: 'レビューを削除しました' });
      },
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full items-center gap-x-4">
          <Avatar className="size-16">
            <AvatarImage
              className="bg-primary/50"
              src={review.user.avatarUrl}
              alt="avatar-image"
            />
            <AvatarFallback className="font-semibold">
              {review.user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="-mb-1 text-lg font-semibold">{review.user.name}</p>
            <div className="flex items-center">
              <p className="whitespace-nowrap text-sm leading-8 tracking-wide text-muted-foreground">
                {formatDateJP(review.updatedAt)} {formatTime(review.updatedAt)}
              </p>
              <div className="ml-2 flex w-16">
                {user?.id === review.user.id && (
                  <>
                    <Button
                      className="size-8 rounded-full text-muted-foreground"
                      variant="ghost"
                      size="icon"
                      onClick={() => user && setIsOpen(true)}
                    >
                      <SquarePenIcon className="size-4" />
                    </Button>
                    <ReviewUpdateDialog
                      bookId={bookId}
                      review={review}
                      queryKey={queryKey}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                    <Button
                      className="size-8 rounded-full text-muted-foreground"
                      variant="ghost"
                      size="icon"
                      onClick={handleClickDelete}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Rating rating={review.rating} readOnly />
      </div>
      <p className="mt-2 text-muted-foreground sm:pl-20">{review.comment}</p>
    </div>
  );
}
