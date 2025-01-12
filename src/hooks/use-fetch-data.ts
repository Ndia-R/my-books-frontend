import { useEffect, useState } from 'react';

type Props = {
  fetcher: (prop?: unknown) => Promise<unknown>;
};

export const useFetchData = ({ fetcher }: Props) => {
  const [data, setData] = useState<Promise<unknown>>();

  useEffect(() => {
    setData(fetcher());
  }, [fetcher]);

  return { data };
};
