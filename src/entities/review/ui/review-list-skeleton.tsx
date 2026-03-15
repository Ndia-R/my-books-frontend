import { DEFAULT_REVIEWS_SIZE } from '@/shared/config/constants';
import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';

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

export default function ReviewListSkeleton() {
  return (
    <ul className="flex flex-col p-3 sm:p-6">
      {Array.from({ length: DEFAULT_REVIEWS_SIZE }, (_, index) => (
        <li key={index}>
          <Separator className="bg-foreground/10" />
          <article>
            <ReviewItemSkeleton />
          </article>
        </li>
      ))}
    </ul>
  );
}
