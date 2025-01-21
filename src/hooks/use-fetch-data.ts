// 参考：https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/introduction

import { useEffect, useState } from 'react';

const dataMap: Map<string, unknown> = new Map();

type PropsFn<T> = {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
};

export const useFetchData = <T>({ queryKey, queryFn }: PropsFn<T>) => {
  const key = queryKey.join();
  const [data, setData] = useState<T | undefined>(dataMap.get(key) as T | undefined);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      const newData = await queryFn();
      dataMap.set(key, newData);
      setData(newData);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    if (data === undefined) {
      refetch();
    }
    return () => setData(undefined);
  }, [key]);

  if (error) {
    throw error;
  }

  if (data === undefined) {
    throw refetch();
  }

  return { data, refetch };
};
