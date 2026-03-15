import type { Review } from '@/entities/review/model/types';
import ReviewItem from '@/entities/review/ui/review-item';
import { Separator } from '@/shared/ui/separator';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  reviews: Review[];
  renderAction?: (review: Review) => ReactNode;
  getIsOwnReview?: (review: Review) => boolean;
};

export default function ReviewList({
  reviews,
  renderAction,
  getIsOwnReview,
}: Props) {
  return (
    <ul className="flex flex-col p-3 sm:p-6">
      {reviews.map((review) => (
        <li key={review.id}>
          <Separator className="bg-foreground/10" />
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <article>
              <ReviewItem
                review={review}
                isOwnReview={getIsOwnReview?.(review)}
                action={renderAction?.(review)}
              />
            </article>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
