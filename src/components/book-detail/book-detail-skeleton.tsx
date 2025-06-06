import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailSkeleton() {
  return (
    <div className="flex flex-col justify-center p-3 pt-10 sm:p-6 lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-1/2">
        <Skeleton className="bg-muted-foreground/5 h-[360px] w-[280px] rounded-xs object-cover sm:h-[480px] sm:w-[360px]" />
        <div className="mt-2 flex flex-col items-center justify-around sm:w-[440px] sm:flex-row">
          <Skeleton className="bg-muted-foreground/5 mt-2 h-6 w-48" />
          <div className="flex justify-center gap-x-2">
            <Skeleton className="bg-muted-foreground/5 size-8" />
            <Skeleton className="bg-muted-foreground/5 size-8" />
          </div>
        </div>
        <div className="my-4 flex items-center">
          <Skeleton className="bg-muted-foreground/5 h-11 w-48" />
        </div>
      </div>

      <div className="p-4 lg:w-1/2">
        <div className="text-3xl font-bold sm:text-4xl">
          <Skeleton className="bg-muted-foreground/5 h-9 w-64 sm:h-10" />
        </div>
        <div className="my-4 flex w-full flex-wrap items-center justify-end gap-x-3">
          <Skeleton className="bg-muted-foreground/5 h-7 w-24 sm:h-8" />
        </div>

        <div className="flex gap-x-2">
          <Skeleton className="bg-muted-foreground/5 h-9 w-24" />
          <Skeleton className="bg-muted-foreground/5 h-9 w-24" />
        </div>

        <div className="my-6 md:my-10">
          <Skeleton className="bg-muted-foreground/5 my-2 h-6 w-full" />
          <Skeleton className="bg-muted-foreground/5 my-2 h-6 w-full" />
          <Skeleton className="bg-muted-foreground/5 my-2 h-6 w-full" />
        </div>

        <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
          <div className="text-muted-foreground flex flex-col gap-y-1">
            <div className="flex">
              <Skeleton className="bg-muted-foreground/5 mb-1 h-5 w-48" />
            </div>
            <div className="flex">
              <Skeleton className="bg-muted-foreground/5 mb-1 h-5 w-36" />
            </div>
            <div className="flex">
              <Skeleton className="bg-muted-foreground/5 mb-1 h-5 w-44" />
            </div>
            <div className="flex">
              <Skeleton className="bg-muted-foreground/5 mb-1 h-5 w-36" />
            </div>
            <div className="flex">
              <Skeleton className="bg-muted-foreground/5 mb-1 h-5 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
