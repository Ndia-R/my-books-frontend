import GenreList from '@/components/genres/genre-list';
import { queryKeys } from '@/constants/query-keys';
import { getGenres } from '@/lib/api/genres';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenresTopPage() {
  const { data: genres } = useSuspenseQuery({
    queryKey: queryKeys.genre.all,
    queryFn: () => getGenres(),
  });

  return <GenreList genres={genres} />;
}
