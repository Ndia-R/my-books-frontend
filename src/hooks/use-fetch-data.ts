/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

type Props = {
  queryKey: unknown[];
  queryFn: () => Promise<unknown>;
};

export const useFetchData = ({ queryKey, queryFn }: Props) => {
  const [data, setData] = useState<Promise<unknown>>();

  useEffect(() => {
    setData(queryFn());
  }, [...queryKey]);

  const refetch = () => {
    setData(queryFn());
  };

  return { data, refetch };
};
