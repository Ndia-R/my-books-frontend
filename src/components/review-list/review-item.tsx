import Rating from '@/components/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/util';
import { Review } from '@/types/review';

type Props = {
  review: Review;
};

export default function ReviewItem({ review }: Props) {
  const { user, rating, comment, updatedAt } = review;

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-y-4 p-4 pb-0 sm:flex-row">
        <div className="flex items-center gap-x-4">
          <Avatar className="size-16">
            <AvatarImage className="bg-primary" src={user.avatarUrl} alt="avatar-image" />
            <AvatarFallback className="font-semibold">
              {user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{formatDate(updatedAt)}</p>
          </div>
        </div>
        <Rating rating={rating} readOnly />
      </div>
      <p className="p-4 text-muted-foreground">{comment}</p>
    </div>
  );
}
