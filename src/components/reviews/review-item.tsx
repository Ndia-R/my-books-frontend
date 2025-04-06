import Rating from '@/components/rating';
import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { formatDateJP, formatTime } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { Review, ReviewDeleteMutation, ReviewUpdateMutation } from '@/types';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  review: Review;
  updateMutation: ReviewUpdateMutation;
  deleteMutation: ReviewDeleteMutation;
};

export default function ReviewItem({
  review,
  updateMutation,
  deleteMutation,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex w-full items-center gap-x-4">
            <Avatar className="size-16">
              <AvatarImage
                className="bg-primary/50"
                src={AVATAR_IMAGE_BASE_URL + review.avatarPath}
                alt="avatar-image"
              />
              <AvatarFallback className="font-semibold">
                {review.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="-mb-1 text-lg font-semibold">{review.name}</p>
              <div className="flex items-center">
                <time
                  className="text-muted-foreground mr-2 flex gap-x-1 text-sm leading-8 tracking-wide whitespace-nowrap"
                  dateTime={
                    Date.parse(review.createdAt) ? review.createdAt : ''
                  }
                >
                  <span>{formatDateJP(review.createdAt)}</span>
                  <span>{formatTime(review.createdAt)}</span>
                </time>
                {user?.id === review.userId && (
                  <Button
                    className="text-muted-foreground size-8 rounded-full"
                    variant="ghost"
                    size="icon"
                    aria-label="レビューを編集"
                    onClick={() => setIsOpen(true)}
                  >
                    <SquarePenIcon className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Rating rating={review.rating} readOnly />
        </div>
        <p className="text-muted-foreground mt-2 sm:pl-20">{review.comment}</p>
      </div>

      <ReviewUpdateDialog
        review={review}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </>
  );
}
