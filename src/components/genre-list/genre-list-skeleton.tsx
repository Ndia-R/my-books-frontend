import { Skeleton } from '@/components/ui/skeleton';

export default function GenreListSkeleton() {
  return (
    <ul className="flex flex-wrap px-4">
      {[...Array<number>(12)].map((_, index) => (
        <li key={index}>
          <Skeleton className="h-10 w-24 rounded-full" />
        </li>
      ))}
    </ul>
  );
}
