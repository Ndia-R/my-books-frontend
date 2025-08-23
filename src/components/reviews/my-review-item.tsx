import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import Rating from '@/components/shared/rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { deleteReview, updateReview } from '@/lib/api/review';
import { formatDateJP, formatTime } from '@/lib/utils';
import { Review, ReviewUpdateParams } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  review: Review;
};

export default function MyReviewItem({ review }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.getUserReviews(1),
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

  const { prefetchBookDetail } = usePrefetch();

  const handlePrefetch = () => {
    prefetchBookDetail(review.book.id);
  };

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex gap-x-4 p-4">
            <div className="flex min-w-20 justify-center sm:min-w-24">
              <Link
                className="size-fit"
                to={`/book/${review.book.id}`}
                aria-label={`${review.book.title}の詳細ページへ移動`}
                onMouseEnter={handlePrefetch}
                onFocus={handlePrefetch}
              >
                <img
                  className="h-24 rounded-xs object-cover sm:h-28"
                  src={BOOK_IMAGE_BASE_URL + review.book.imagePath}
                  alt={review.book.title}
                />
              </Link>
            </div>

            <div className="flex w-full flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link
                  className="size-fit"
                  to={`/book/${review.book.id}`}
                  aria-label={`${review.book.title}の詳細ページへ移動`}
                  onMouseEnter={handlePrefetch}
                  onFocus={handlePrefetch}
                >
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {review.book.title}
                  </h2>
                </Link>

                <time
                  className="text-muted-foreground mr-1 flex gap-x-1 text-sm"
                  dateTime={
                    Date.parse(review.createdAt) ? review.createdAt : ''
                  }
                >
                  <span>{formatDateJP(review.createdAt)}</span>
                  <span>{formatTime(review.createdAt)}</span>
                </time>
              </div>

              <div className="flex flex-row items-center">
                <Rating rating={review.rating} readOnly />
                <Button
                  className="text-muted-foreground size-8"
                  variant="ghost"
                  size="icon"
                  aria-label="レビューを編集"
                  onClick={() => setIsOpen(true)}
                >
                  <SquarePenIcon />
                </Button>
              </div>

              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
