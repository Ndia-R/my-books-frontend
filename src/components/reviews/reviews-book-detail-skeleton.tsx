import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';

const ReviewItemSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full items-center gap-x-4">
          <Skeleton className="bg-muted-foreground/5 size-16 rounded-full" />
          <div>
            <div className="-mb-1">
              <Skeleton className="bg-muted-foreground/5 my-2 h-5 w-20 rounded-full" />
            </div>
            <div className="flex items-center">
              <Skeleton className="bg-muted-foreground/5 my-1.5 h-5 w-32 rounded-full" />
              <div className="ml-2 flex w-14"></div>
            </div>
          </div>
        </div>
        <Skeleton className="bg-muted-foreground/5 my-1 h-8 w-40 rounded-full" />
      </div>
      <div className="text-muted-foreground mt-2 sm:pl-20">
        <Skeleton className="bg-muted-foreground/5 h-6 w-full rounded-full" />
      </div>
    </div>
  );
};

export default function ReviewsBookDetailSkeleton() {
  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <Skeleton className="bg-muted-foreground/5 h-10 w-44 rounded-full" />
      </div>
      <ul className="flex flex-col p-3 sm:p-6">
        {[...Array<number>(FETCH_REVIEWS_MAX_RESULTS)].map((_, index) => (
          <li key={index}>
            <Separator className="bg-foreground/10" />
            <ReviewItemSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
