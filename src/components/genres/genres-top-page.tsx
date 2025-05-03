import GenreList from '@/components/genres/genre-list';
import { getGenres } from '@/lib/api/genres';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenresTopPage() {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

  return <GenreList genres={genres} />;
}
