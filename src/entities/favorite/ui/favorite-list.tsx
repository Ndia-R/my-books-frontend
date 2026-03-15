import type { Favorite } from '@/entities/favorite/model/types';
import FavoriteItem from '@/entities/favorite/ui/favorite-item';
import type { ReactNode } from 'react';

type Props = {
  favorites: Favorite[];
  renderAction?: (favorite: Favorite) => ReactNode;
};

export default function FavoriteList({ favorites, renderAction }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {favorites.map((favorite, index) => (
        <li key={index}>
          <article>
            <FavoriteItem
              favorite={favorite}
              action={renderAction?.(favorite)}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
