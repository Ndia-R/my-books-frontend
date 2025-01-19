import CountUpNumber from '@/components/count-up-number';
import { getFavoriteCount } from '@/lib/data';
import { useEffect, useState } from 'react';

type Props = {
  bookId: string;
};

export default function FavoriteCount({ bookId }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const favoriteCount = await getFavoriteCount(bookId);
      if (favoriteCount) {
        setCount(favoriteCount);
      }
    };
    init();
  }, []);

  return (
    <>
      <CountUpNumber end={count} />
    </>
  );
}
