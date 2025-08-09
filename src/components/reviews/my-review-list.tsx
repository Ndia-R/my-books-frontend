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
          <article className="animate-in fade-in-0 slide-in-from-top-2 fill-mode-both delay-0 duration-500">
            <MyReviewItem review={review} />
          </article>
        </li>
      ))}
    </ul>
  );
}
