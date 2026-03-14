import FavoriteItem from '@/widgets/favorites/ui/favorite-item';
import type { Favorite } from '@/entities/favorite/model/types';

type Props = {
  favorites: Favorite[];
};

export default function FavoriteList({ favorites }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {favorites.map((favorite, index) => (
        <li key={index}>
          <article>
            <FavoriteItem favorite={favorite} />
          </article>
        </li>
      ))}
    </ul>
  );
}
