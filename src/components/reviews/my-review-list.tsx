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
            <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
              <MyReviewItem review={review} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
