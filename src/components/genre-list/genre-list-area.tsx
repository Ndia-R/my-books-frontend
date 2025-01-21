import GenreList from '@/components/genre-list/genre-list';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getGenres } from '@/lib/data';
import { Genre } from '@/types';
import { Await } from 'react-router-dom';

export default function GenreListArea() {
  const { data: genres } = useFetchData({
    queryKey: ['GenreListArea'],
    queryFn: () => getGenres(),
  });

  return (
    <Await resolve={genres}>
      {(genres: Genre[]) => {
        if (!genres) return <GenreListSkeleton />;
        return <GenreList genres={genres} variant="ghost" />;
      }}
    </Await>
  );
}
