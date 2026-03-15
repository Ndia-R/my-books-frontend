import { usePrefetchBook } from '@/entities/book';
import { GenreList, genreQueryKeys, getGenres } from '@/entities/genre';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenresTopPage() {
  const { data: genres } = useSuspenseQuery({
    queryKey: genreQueryKeys.getGenres(),
    queryFn: () => getGenres(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { prefetchBookDiscover } = usePrefetchBook();

  return (
    <GenreList
      genres={genres}
      onItemPrefetch={(genre) =>
        prefetchBookDiscover(String(genre.id), 'SINGLE')
      }
    />
  );
}
