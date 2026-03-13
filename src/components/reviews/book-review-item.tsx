import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import Rating from '@/components/shared/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { Role } from '@/constants/roles';
import { SubscriptionPlan } from '@/constants/subscription-plans';
import { deleteReview, updateReview } from '@/lib/api/reviews';
import { formatDateJP, formatRelativeTime, formatTime } from '@/lib/format';
import { useAuth } from '@/providers/auth-provider';
import type { Review, ReviewUpdateParams } from '@/types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  review: Review;
};

export default function BookReviewItem({ review }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile, hasRole, hasPlan } = useAuth();

  const isOwnReview = userProfile?.id === review.userId;
  const canEditReview = hasRole(Role.USER) && hasPlan(SubscriptionPlan.PREMIUM);

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.getBookReviewsInfinite(review.book.id),
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.isReviewedByUser(review.book.id),
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.getBookDetails(review.book.id),
    });
  };

  const updateMutation = useMutation({
    mutationFn: ({ reviewId, requestBody }: ReviewUpdateParams) =>
      updateReview(reviewId, requestBody),
    onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess,
  });

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex w-full items-center gap-x-4">
            <div className="relative">
              <Avatar className="size-16">
                <AvatarImage
                  className="bg-foreground/20"
                  src={AVATAR_IMAGE_BASE_URL + review.avatarPath}
                  alt="avatar-image"
                />
                <AvatarFallback className="font-semibold">
                  {review.displayName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              {isOwnReview && (
                <Badge className="absolute -right-1 -bottom-1 size-5 rounded-full" />
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="-mb-1 leading-8 font-semibold">
                {review.displayName}
              </p>
              <div className="flex items-center">
                <time
                  className="text-muted-foreground mr-2 text-sm"
                  dateTime={
                    Date.parse(review.updatedAt) ? review.updatedAt : ''
                  }
                  title={`${formatDateJP(review.updatedAt)} ${formatTime(review.updatedAt)}`}
                >
                  {formatRelativeTime(review.updatedAt)}
                </time>
                {isOwnReview && canEditReview && (
                  <Button
                    className="text-muted-foreground size-8"
                    variant="ghost"
                    size="icon"
                    aria-label="レビューを編集"
                    onClick={() => setIsOpen(true)}
                  >
                    <SquarePenIcon />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Rating rating={review.rating} key={review.rating} readOnly />
        </div>
        <p className="text-muted-foreground mt-2 text-sm sm:pl-20 sm:text-base">
          {review.comment}
        </p>
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
