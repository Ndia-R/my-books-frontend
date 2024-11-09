import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col justify-center p-6 pt-10 lg:flex-row">
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <Skeleton className="h-[360px] w-[280px] rounded object-cover sm:h-[480px] sm:w-[360px]" />
          <div className="my-4 flex items-center gap-x-2">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>

        <div className="p-4 lg:w-1/2">
          <div className="text-3xl font-bold sm:text-4xl">
            <Skeleton className="h-9 w-64 rounded-full sm:h-10" />
          </div>
          <div className="my-4 flex w-full flex-wrap items-center justify-end gap-x-3">
            <Skeleton className="h-7 w-24 rounded-full sm:h-8" />
          </div>

          <div className="flex gap-x-2">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>

          <div className="my-6">
            <Skeleton className="my-2 h-6 w-full rounded-full" />
            <Skeleton className="my-2 h-6 w-full rounded-full" />
            <Skeleton className="my-2 h-6 w-full rounded-full" />
          </div>

          <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
            <div className="flex flex-col gap-y-1 text-muted-foreground">
              <div className="flex">
                <Skeleton className="mb-1 h-5 w-48 rounded-full" />
              </div>
              <div className="flex">
                <Skeleton className="mb-1 h-5 w-36 rounded-full" />
              </div>
              <div className="flex">
                <Skeleton className="mb-1 h-5 w-44 rounded-full" />
              </div>
              <div className="flex">
                <Skeleton className="mb-1 h-5 w-36 rounded-full" />
              </div>
              <div className="flex">
                <Skeleton className="mb-1 h-5 w-32 rounded-full" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-end gap-y-4 sm:items-end">
              <div className="h-10" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
