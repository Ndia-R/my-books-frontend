import GenreList from '@/components/genre-list/genre-list';
import { useApiGenre } from '@/hooks/api/use-api-genre';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenreListTopPage() {
  const { getGenres } = useApiGenre();

  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

  return <GenreList genres={genres} variant="ghost" />;
}
