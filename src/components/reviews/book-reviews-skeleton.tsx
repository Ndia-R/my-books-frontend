import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_REVIEWS_SIZE } from '@/constants/constants';

const ReviewItemSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full items-center gap-x-4">
          <Skeleton className="bg-muted-foreground/5 size-16" />
          <div>
            <div className="-mb-1">
              <Skeleton className="bg-muted-foreground/5 my-2 h-5 w-20" />
            </div>
            <div className="flex items-center">
              <Skeleton className="bg-muted-foreground/5 my-1.5 h-5 w-32" />
              <div className="ml-2 flex w-14"></div>
            </div>
          </div>
        </div>
        <Skeleton className="bg-muted-foreground/5 my-1 h-8 w-40" />
      </div>
      <div className="text-muted-foreground mt-2 sm:pl-20">
        <Skeleton className="bg-muted-foreground/5 h-6 w-full" />
      </div>
    </div>
  );
};

export default function BookReviewsSkeleton() {
  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <Skeleton className="bg-muted-foreground/5 h-10 w-44" />
      </div>
      <ul className="flex flex-col p-3 sm:p-6">
        {[...Array<number>(DEFAULT_REVIEWS_SIZE)].map((_, index) => (
          <li key={index}>
            <Separator className="bg-foreground/10" />
            <ReviewItemSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
