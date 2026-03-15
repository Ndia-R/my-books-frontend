import { FavoriteListSkeleton } from '@/entities/favorite';

export default function FavoritesSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6"></p>
      <FavoriteListSkeleton />
    </div>
  );
}
