import { Pagination } from '@/components/pagination';
import ReviewCreateDialog from '@/components/review-list/review-create-dialog';
import ReviewItem from '@/components/review-list/review-item';
import { Separator } from '@/components/ui/separator';
import { useFetchData } from '@/hooks/use-fetch-data';
import { checkMyReviewExists, getReviews } from '@/lib/data';
import { PaginatedReview } from '@/types';
import { useState } from 'react';

type Props = {
  bookId: string;
};

export default function ReviewList({ bookId }: Props) {
  const [page, setPage] = useState(1);

  const { data, refetch } = useFetchData<[PaginatedReview, boolean]>({
    queryKey: ['ReviewList', bookId, page],
    queryFn: () =>
      Promise.all([getReviews(bookId, page - 1), checkMyReviewExists(bookId)]),
  });

  const [paginatedreview, reviewExists] = data;

  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <p>レビュー {paginatedreview.totalItems} 件</p>
        <ReviewCreateDialog
          bookId={bookId}
          reviewExists={reviewExists}
          refetch={refetch}
        />
      </div>

      <ul className="flex flex-col p-3 sm:p-6">
        {paginatedreview.reviews.map((review) => (
          <li key={review.reviewId.userId}>
            <Separator className="bg-foreground/10" />
            <ReviewItem review={review} bookId={bookId} refetch={refetch} />
          </li>
        ))}
      </ul>

      <div className="mb-4 flex justify-center">
        {paginatedreview.totalPages > 1 && (
          <Pagination
            total={paginatedreview.totalPages}
            page={page}
            onChangePage={setPage}
          />
        )}
      </div>
    </div>
  );
}
