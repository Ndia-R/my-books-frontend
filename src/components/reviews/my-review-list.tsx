import MyReviewItem from '@/components/reviews/my-review-item';
import { Review } from '@/types';

type Props = {
  reviews: Review[];
};

export default function MyReviewList({ reviews }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {reviews.map((review) => (
        <li key={review.id}>
          <article>
            <MyReviewItem review={review} />
          </article>
        </li>
      ))}
    </ul>
  );
}
