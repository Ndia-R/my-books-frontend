import ReviewDialog from '@/components/review-list/review-dialog';
import ReviewItem from '@/components/review-list/review-item';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import { Separator } from '@/components/ui/separator';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getReviewsByBookId } from '@/lib/data';
import { Review } from '@/types/review';
import { useCallback } from 'react';
import { Await } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function ReviewList({ bookId }: Props) {
  const fetcher = useCallback(() => getReviewsByBookId(bookId), [bookId]);

  const { data: reviews } = useFetchData({ fetcher });

  return (
    <Await resolve={reviews}>
      {(reviews: Review[]) => {
        if (!reviews) return <ReviewListSkeleton />;
        return (
          <div className="mx-auto w-full lg:w-3/4">
            <div className="flex items-center justify-end gap-x-4 px-3 sm:px-6">
              <p>レビュー {reviews.length} 件</p>
              <ReviewDialog bookId={bookId} />
            </div>

            <ul className="flex flex-col p-3 sm:p-6">
              {reviews.map((review) => (
                <li key={review.id}>
                  <Separator className="bg-foreground/10" />
                  <ReviewItem review={review} />
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Await>
  );
}
