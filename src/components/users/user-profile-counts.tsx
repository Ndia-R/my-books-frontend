import CountUpNumber from '@/components/shared/count-up-number';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { getUserProfileCounts } from '@/lib/api/users';
import { useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function UserProfileCounts() {
  const { data: userProfileCounts } = useSuspenseQuery({
    queryKey: queryKeys.getUserProfileCounts(),
    queryFn: () => getUserProfileCounts(),
  });

  const {
    prefetchUserFavoritesInfinite,
    prefetchUserBookmarksInfinite,
    prefetchUserReviewsInfinite,
  } = usePrefetch();

  return (
    <div className="flex justify-between">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <Link
          to="/favorites"
          aria-label="お気に入りページへ移動"
          onMouseEnter={prefetchUserFavoritesInfinite}
          onFocus={prefetchUserFavoritesInfinite}
        >
          <div className="w-24 space-y-1 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber
                end={userProfileCounts.favoriteCount}
                delay={300}
                ease="easeOut"
              />
            </p>
            <p className="text-sm">お気に入り</p>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Link
          to="/bookmarks"
          aria-label="ブックマークページへ移動"
          onMouseEnter={prefetchUserBookmarksInfinite}
          onFocus={prefetchUserBookmarksInfinite}
        >
          <div className="w-24 space-y-1 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber
                end={userProfileCounts.bookmarkCount}
                delay={400}
                ease="easeOut"
              />
            </p>
            <p className="text-sm">ブックマーク</p>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/my-reviews"
          aria-label="マイレビューページへ移動"
          onMouseEnter={prefetchUserReviewsInfinite}
          onFocus={prefetchUserReviewsInfinite}
        >
          <div className="w-24 space-y-1 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber
                end={userProfileCounts.reviewCount}
                delay={500}
                ease="easeOut"
              />
            </p>
            <p className="text-sm">マイレビュー</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
