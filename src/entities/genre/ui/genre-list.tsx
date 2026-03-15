import type { Genre } from '@/entities/genre/model/types';
import GenreItem from '@/entities/genre/ui/genre-item';

type Props = {
  genres: Genre[];
  activeIds?: number[];
  onClick?: (genreId: number) => void;
  onItemPrefetch?: (genre: Genre) => void;
};

export default function GenreList({
  genres,
  activeIds,
  onClick,
  onItemPrefetch,
}: Props) {
  return (
    <ul className="flex flex-wrap gap-1">
      {genres.map((genre) => (
        <li key={genre.id}>
          <GenreItem
            genre={genre}
            isActive={activeIds?.includes(genre.id)}
            onClick={onClick}
            onPrefetch={
              onItemPrefetch ? () => onItemPrefetch(genre) : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
