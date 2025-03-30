import Rating from '@/components/rating';
import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { formatDateJP, formatTime } from '@/lib/utils';
import {
  Review,
  ReviewCreateMutation,
  ReviewDeleteMutation,
  ReviewUpdateMutation,
} from '@/types';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

type Props = {
  review: Review;
  createMutation?: ReviewCreateMutation;
  updateMutation?: ReviewUpdateMutation;
  deleteMutation?: ReviewDeleteMutation;
};

export default function MyReviewItem({
  review,
  updateMutation,
  deleteMutation,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { confirmDialog } = useConfirmDialog();

  const handleClickUpdate = () => {
    setIsOpen(true);
  };

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: '削除しますか？',
      message: '削除すると元に戻りません。',
      actionLabel: '削除',
    });
    if (isCancel) return;

    deleteMutation?.mutate(review.id, {
      onSuccess: () => {
        toast.success('レビューを削除しました');
      },
    });
  };

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-3 px-3 py-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link to={`/book/${review.book.id}`} className="size-fit">
              <img
                className="h-24 rounded-sm object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + review.book.imagePath}
                alt={review.book.title}
              />
            </Link>
          </div>
          <div className="flex w-full flex-col justify-center">
            <Link to={`/book/${review.book.id}`} className="size-fit">
              <h2 className="hover:text-primary text-base font-semibold sm:text-xl">
                {review.book.title}
              </h2>
            </Link>
            <div className="mb-2 flex flex-col items-start sm:flex-row sm:items-center">
              <div className="mr-2">
                <Rating rating={review.rating} readOnly />
              </div>
              <div className="flex flex-wrap items-center">
                <time
                  className="text-muted-foreground mr-2 text-xs leading-8 tracking-wide whitespace-nowrap sm:text-sm"
                  dateTime={
                    Date.parse(review.updatedAt) ? review.updatedAt : ''
                  }
                >
                  {formatDateJP(review.updatedAt)}{' '}
                  {formatTime(review.updatedAt)}
                </time>
                <Button
                  className="text-muted-foreground size-8 rounded-full"
                  variant="ghost"
                  size="icon"
                  aria-label="レビューを編集"
                  onClick={handleClickUpdate}
                >
                  <SquarePenIcon className="size-4" />
                </Button>
                <ReviewUpdateDialog
                  review={review}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  updateMutation={updateMutation}
                />
                <Button
                  className="text-muted-foreground size-8 rounded-full"
                  variant="ghost"
                  size="icon"
                  aria-label="レビューを削除"
                  onClick={handleClickDelete}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
