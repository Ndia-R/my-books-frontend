import type { Review } from '@/entities/review/model/types';
import MyReviewItem from '@/entities/review/ui/my-review-item';
import type { ReactNode } from 'react';

type Props = {
  reviews: Review[];
  renderAction?: (review: Review) => ReactNode;
};

export default function MyReviewList({ reviews, renderAction }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {reviews.map((review) => (
        <li key={review.id}>
          <article>
            <MyReviewItem
              review={review}
              action={renderAction?.(review)}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
