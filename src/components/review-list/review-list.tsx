import ReviewItem from '@/components/review-list/review-item';
import { Review } from '@/types/book';

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  console.log(reviews);

  return (
    <>
      <ul className="flex flex-col gap-y-6 p-6">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </>
  );
}
