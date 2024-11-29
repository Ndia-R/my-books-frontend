import ReviewItem from '@/components/review-list/review-item';
import { Review } from '@/types/review';

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  return (
    <ul className="flex flex-col p-6">
      {reviews.map((review) => (
        <li className="border-t border-t-muted" key={review.id}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
}
