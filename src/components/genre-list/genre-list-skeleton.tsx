import { Skeleton } from '@/components/ui/skeleton';

export default function GenreListSkeleton() {
  return (
    <ul className="mx-2 my-4 flex flex-wrap gap-2">
      {[...Array<number>(12)].map((_, index) => (
        <li key={index}>
          <Skeleton className="h-8 w-24 rounded-full" />
        </li>
      ))}
    </ul>
  );
}
