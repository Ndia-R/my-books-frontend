import Rating from '@/components/rating';
import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { deleteReview, updateReview } from '@/lib/api/review';
import { formatDateJP, formatTime } from '@/lib/utils';
import { useUser } from '@/providers/user-provider';
import { Review, ReviewRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

type Props = {
  review: Review;
};

export default function BookReviewItem({ review }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const params = useParams();
  const bookId = params.bookId || '';

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.book.reviews(bookId, 1),
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.user.reviewsByBookId(bookId),
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.book.details(bookId),
    });
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const updateMutation = useMutation({
    mutationFn: ({
      reviewId,
      requestBody,
    }: {
      reviewId: number;
      requestBody: ReviewRequest;
    }) => updateReview(reviewId, requestBody),
    onSuccess,
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess,
    onError,
  });

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex w-full items-center gap-x-4">
            <div className="relative">
              <Avatar className="size-16">
                <AvatarImage
                  className="bg-foreground/30"
                  src={AVATAR_IMAGE_BASE_URL + review.avatarPath}
                  alt="avatar-image"
                />
                <AvatarFallback className="font-semibold">
                  {review.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              {user?.id === review.userId && (
                <Badge className="absolute -right-1 -bottom-1 size-5 rounded-full" />
              )}
            </div>
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
                    className="text-muted-foreground size-8"
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
