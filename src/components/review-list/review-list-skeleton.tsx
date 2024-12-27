import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewListSkeleton() {
  return (
    <>
      <ul className="flex flex-col gap-y-6 p-6">
        {[...Array<number>(2)].map((_, index) => (
          <li key={index}>
            <Separator className="bg-foreground/10" />
            <div className="flex flex-col items-center justify-between gap-y-4 p-4 pb-0 sm:flex-row">
              <div className="flex items-center gap-x-4">
                <Skeleton className="size-16 rounded-full bg-muted-foreground/5" />
                <div>
                  <Skeleton className="my-2 h-5 w-20 rounded-full bg-muted-foreground/5" />
                  <Skeleton className="my-2 h-5 w-32 rounded-full bg-muted-foreground/5" />
                </div>
              </div>
              <Skeleton className="h-8 w-40 rounded-full bg-muted-foreground/5" />
            </div>
            <div className="p-4">
              <Skeleton className="my-1 h-5 w-full rounded-full bg-muted-foreground/5" />
              <Skeleton className="my-1 h-5 w-3/4 rounded-full bg-muted-foreground/5" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
