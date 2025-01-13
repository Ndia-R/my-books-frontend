import { useEffect, useState, useTransition } from 'react';

type Props = {
  fetcher: (prop?: unknown) => Promise<unknown>;
};

export const useFetchData = ({ fetcher }: Props) => {
  const [data, setData] = useState<Promise<unknown>>();
  const [, startTransition] = useTransition();

  useEffect(() => {
    setData(fetcher());
  }, [fetcher]);

  const refresh = () => {
    startTransition(() => {
      setData(fetcher());
    });
  };

  return { data, refresh };
};
