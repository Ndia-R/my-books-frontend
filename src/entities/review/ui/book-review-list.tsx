import BookReviewItem from '@/widgets/book-reviews/ui/book-review-item';
import { Separator } from '@/shared/ui/separator';
import type { Review } from '@/entities/review/model/types';
import { motion } from 'motion/react';

type Props = {
  reviews: Review[];
};

export default function BookReviewList({ reviews }: Props) {
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
              <BookReviewItem review={review} />
            </article>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
