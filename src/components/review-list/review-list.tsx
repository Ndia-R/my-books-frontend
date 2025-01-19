import ReviewCreateDialog from '@/components/review-list/review-create-dialog';
import ReviewItem from '@/components/review-list/review-item';
import ReviewListSkeleton from '@/components/review-list/review-list-skeleton';
import { Separator } from '@/components/ui/separator';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getReviewsByBookId } from '@/lib/data';
import { Review } from '@/types';
import { Await } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function ReviewList({ bookId }: Props) {
  const { data: reviews, refetch } = useFetchData({
    queryKey: [bookId],
    queryFn: () => getReviewsByBookId(bookId),
  });

  return (
    <Await resolve={reviews}>
      {(reviews: Review[]) => {
        if (!reviews) return <ReviewListSkeleton />;
        return (
          <div className="mx-auto w-full lg:w-3/4">
            <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
              <p>レビュー {reviews.length} 件</p>
              <ReviewCreateDialog bookId={bookId} refetch={refetch} />
            </div>

            <ul className="flex flex-col p-3 sm:p-6">
              {reviews.map((review) => (
                <li key={review.reviewId.userId}>
                  <Separator className="bg-foreground/10" />
                  <ReviewItem review={review} bookId={bookId} refetch={refetch} />
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Await>
  );
}
