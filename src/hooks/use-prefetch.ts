import { usePrefetchBook } from '@/entities/book/api/use-prefetch';
import { usePrefetchUser } from '@/entities/user/api/use-prefetch';

export default function usePrefetch() {
  return {
    ...usePrefetchBook(),
    ...usePrefetchUser(),
  };
}
