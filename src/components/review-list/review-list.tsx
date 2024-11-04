import ReviewItem from '@/components/review-list/review-item';
import { Review } from '@/types/book';

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  console.log(reviews);

  return (
    <>
      <div className="mx-auto w-full lg:w-3/4">
        <div className="p-6">
          {reviews.map((review) => (
            <ReviewItem className="mb-6" review={review} key={review.id} />
          ))}
        </div>
      </div>
    </>
  );
}
