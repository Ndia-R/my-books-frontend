import { ReviewListSkeleton } from '@/entities/review';
import { Skeleton } from '@/shared/ui/skeleton';

export default function BookReviewsSkeleton() {
  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <Skeleton className="bg-muted-foreground/5 h-10 w-44" />
      </div>
      <ReviewListSkeleton />
    </div>
  );
}
