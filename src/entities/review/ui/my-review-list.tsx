import MyReviewItem from '@/widgets/my-reviews/ui/my-review-item';
import type { Review } from '@/entities/review/model/types';

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
