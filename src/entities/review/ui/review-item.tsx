import type { Review } from '@/entities/review/model/types';
import { AVATAR_IMAGE_BASE_URL } from '@/shared/config/constants';
import {
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import Rating from '@/shared/ui/rating';
import type { ReactNode } from 'react';

type Props = {
  review: Review;
  isOwnReview?: boolean;
  action?: ReactNode;
};

export default function ReviewItem({ review, isOwnReview, action }: Props) {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full items-center gap-x-4">
          <div className="relative">
            <Avatar className="size-16">
              <AvatarImage
                className="bg-foreground/20"
                src={AVATAR_IMAGE_BASE_URL + review.avatarPath}
                alt="avatar-image"
              />
              <AvatarFallback className="font-semibold">
                {review.displayName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {isOwnReview && (
              <Badge className="absolute -right-1 -bottom-1 size-5 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="-mb-1 leading-8 font-semibold">
              {review.displayName}
            </p>
            <div className="flex items-center">
              <time
                className="text-muted-foreground mr-2 text-sm"
                dateTime={Date.parse(review.updatedAt) ? review.updatedAt : ''}
                title={`${formatDateJP(review.updatedAt)} ${formatTime(review.updatedAt)}`}
              >
                {formatRelativeTime(review.updatedAt)}
              </time>
              {action}
            </div>
          </div>
        </div>
        <Rating rating={review.rating} key={review.rating} readOnly />
      </div>
      <p className="text-muted-foreground mt-2 text-sm sm:pl-20 sm:text-base">
        {review.comment}
      </p>
    </div>
  );
}
