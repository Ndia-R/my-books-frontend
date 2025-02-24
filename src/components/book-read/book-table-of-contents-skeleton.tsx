import { Skeleton } from '@/components/ui/skeleton';

export default function BookTableOfContentsSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex w-full flex-col items-center gap-y-4 sm:items-start">
          <Skeleton className="h-12 w-96 rounded-full bg-muted-foreground/5" />
          <Skeleton className="h-10 w-44 rounded-full bg-muted-foreground/5" />
        </div>
        <ul className="flex w-full flex-col items-center gap-y-8 text-base sm:items-start sm:text-xl">
          {[...Array<number>(5)].map((_, index) => (
            <li key={index} className="flex flex-col items-center sm:items-start">
              <Skeleton className="my-1 h-3 w-16 rounded-full bg-muted-foreground/5" />
              <Skeleton className="my-1 h-6 w-64 rounded-full bg-muted-foreground/5" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
