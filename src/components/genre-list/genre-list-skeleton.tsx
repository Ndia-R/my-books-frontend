import { Skeleton } from '@/components/ui/skeleton';

export default function GenreListSkeleton() {
  return (
    <>
      <ul className="flex flex-wrap gap-x-2">
        {[...Array<number>(3)].map((_, index) => (
          <li key={index}>
            <Skeleton className="h-9 w-24 rounded-full bg-muted-foreground/5" />
          </li>
        ))}
      </ul>
    </>
  );
}
