import GenreItem from '@/components/genres/genre-item';
import { Genre } from '@/types';

type Props = {
  genres: Genre[];
  activeIds?: number[];
  onClick?: (genreId: number) => void;
};

export default function GenreList({ genres, activeIds, onClick }: Props) {
  return (
    <ul className="flex flex-wrap">
      {genres.map((genre) => (
        <li key={genre.id}>
          <GenreItem
            genre={genre}
            isActive={activeIds?.includes(genre.id)}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
}
