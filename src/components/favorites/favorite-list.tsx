import FavoriteItem from '@/components/favorites/favorite-item';
import { Favorite } from '@/types';

type Props = {
  favorites: Favorite[];
};

export default function FavoriteList({ favorites }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {favorites.map((favorite, index) => (
        <li key={index}>
          <article>
            <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
              <FavoriteItem favorite={favorite} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
