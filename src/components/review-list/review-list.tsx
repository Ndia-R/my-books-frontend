import { Pagination } from '@/components/pagination';
import ReviewCreateDialog from '@/components/review-list/review-create-dialog';
import ReviewItem from '@/components/review-list/review-item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { checkMyReviewExists, getReviewsById } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  bookId: string;
};

export default function ReviewList({ bookId }: Props) {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const queryKey = ['ReviewList', 'checkMyReviewExists', bookId, page];
  const {
    data: [paginatedReview, reviewExists],
  } = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      Promise.all([getReviewsById(bookId, page - 1), checkMyReviewExists(bookId)]),
  });

  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <p>レビュー {paginatedReview.totalItems} 件</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-44 rounded-full bg-transparent"
              variant="outline"
              disabled={reviewExists}
              onClick={() => user && setIsOpen(true)}
            >
              {reviewExists ? 'レビュー済み' : 'レビューする'}
            </Button>
          </TooltipTrigger>
          {!user && (
            <TooltipContent>
              ログインしてこの本の「レビュー」を書きましょう
            </TooltipContent>
          )}
        </Tooltip>
        <ReviewCreateDialog
          bookId={bookId}
          queryKey={queryKey}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <ul className="flex flex-col p-3 sm:p-6">
        {paginatedReview.reviews.map((review) => (
          <li key={review.reviewId.userId}>
            <Separator className="bg-foreground/10" />
            <ReviewItem review={review} bookId={bookId} queryKey={queryKey} />
          </li>
        ))}
      </ul>

      <div className="mb-4 flex justify-center">
        {paginatedReview.totalPages > 1 && (
          <Pagination
            total={paginatedReview.totalPages}
            page={page}
            onChangePage={setPage}
          />
        )}
      </div>
    </div>
  );
}
