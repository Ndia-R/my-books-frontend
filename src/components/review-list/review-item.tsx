import Rating from '@/components/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDateJP, formatTime } from '@/lib/util';
import { Review } from '@/types/review';

type Props = {
  review: Review;
};

export default function ReviewItem({ review }: Props) {
  const { user, rating, comment, updatedAt } = review;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
        <div className="flex items-center gap-x-4">
          <Avatar className="size-16">
            <AvatarImage
              className="bg-primary/50"
              src={user.avatarUrl}
              alt="avatar-image"
            />
            <AvatarFallback className="font-semibold">
              {user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm tracking-wide text-muted-foreground">
              {formatDateJP(updatedAt)} {formatTime(updatedAt)}
            </p>
          </div>
        </div>
        <Rating rating={rating} readOnly />
      </div>
      <p className="text-muted-foreground">{comment}</p>
    </div>
  );
}
