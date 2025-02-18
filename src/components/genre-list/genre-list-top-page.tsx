import GenreList from '@/components/genre-list/genre-list';
import { getGenres } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenreListTopPage() {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });
  return (
    <>
      <GenreList genres={genres} variant="ghost" />
    </>
  );
}
