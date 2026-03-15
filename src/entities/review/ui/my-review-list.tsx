import type { Review } from '@/entities/review/model/types';
import MyReviewItem from '@/entities/review/ui/my-review-item';
import type { ReactNode } from 'react';

type Props = {
  reviews: Review[];
  renderAction?: (review: Review) => ReactNode;
  onItemPrefetch?: (review: Review) => void;
};

export default function MyReviewList({
  reviews,
  renderAction,
  onItemPrefetch,
}: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {reviews.map((review) => (
        <li key={review.id}>
          <article>
            <MyReviewItem
              review={review}
              action={renderAction?.(review)}
              onPrefetch={
                onItemPrefetch ? () => onItemPrefetch(review) : undefined
              }
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
