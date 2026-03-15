import { getGenres } from '@/entities/genre/api/genres';
import GenreList from '@/entities/genre/ui/genre-list';
import { queryKeys } from '@/shared/lib/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenresTopPage() {
  const { data: genres } = useSuspenseQuery({
    queryKey: queryKeys.getGenres(),
    queryFn: () => getGenres(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return <GenreList genres={genres} />;
}
