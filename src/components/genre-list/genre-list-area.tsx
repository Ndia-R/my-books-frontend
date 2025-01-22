import GenreList from '@/components/genre-list/genre-list';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import { getGenres } from '@/lib/data';
import { Genre } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Await } from 'react-router-dom';

export default function GenreListArea() {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
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
