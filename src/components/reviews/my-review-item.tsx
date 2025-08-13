import ReviewUpdateDialog from '@/components/reviews/review-update-dialog';
import Rating from '@/components/shared/rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { deleteReview, updateReview } from '@/lib/api/review';
import { getUserReviews } from '@/lib/api/user';
import { formatDateJP, formatTime } from '@/lib/utils';
import { Review, ReviewRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Props = {
  review: Review;
};

export default function MyReviewItem({ review }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { page, updateQueryParams } = useSearchFilters();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({
      reviewId,
      requestBody,
    }: {
      reviewId: number;
      requestBody: ReviewRequest;
    }) => updateReview(reviewId, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.reviews(page),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: async () => {
      // ２ページ以降で、そのページの最後の１つを削除した場合は、１ページ戻る
      const reviewPage = await getUserReviews(page);
      if (page >= 2 && reviewPage.data.length === 0) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.reviews(page - 1),
        });
        updateQueryParams({ page: page - 1 });
        return;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.user.reviews(page),
      });
    },
  });

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex gap-x-4 p-4">
            <div className="flex min-w-20 justify-center sm:min-w-24">
              <Link to={`/book/${review.book.id}`} className="size-fit">
                <img
                  className="h-24 rounded-xs object-cover sm:h-28"
                  src={BOOK_IMAGE_BASE_URL + review.book.imagePath}
                  alt={review.book.title}
                />
              </Link>
            </div>
            <div className="flex w-full flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link to={`/book/${review.book.id}`} className="size-fit">
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {review.book.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center">
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
