import CountUpNumber from '@/components/shared/count-up-number';
import { queryKeys } from '@/constants/query-keys';
import { getUserProfileCounts } from '@/lib/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function UserProfileCounts() {
  const { data: userProfileCounts } = useSuspenseQuery({
    queryKey: queryKeys.user.profileCounts(),
    queryFn: () => getUserProfileCounts(),
  });

  return (
    <div className="flex justify-between">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <Link to="/favorites" aria-label="お気に入りページへ移動">
          <div className="w-24 text-center">
            <p className="text-lg font-bold sm:text-xl">
              <CountUpNumber
                end={userProfileCounts.favoriteCount}
                delay={300}
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
        <Link to="/bookmarks" aria-label="ブックマークページへ移動">
          <div className="w-24 text-center">
            <p className="text-lg font-bold sm:text-xl">
              <CountUpNumber
                end={userProfileCounts.bookmarkCount}
                delay={400}
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
        <Link to="/my-reviews" aria-label="マイレビューページへ移動">
          <div className="w-24 text-center">
            <p className="text-lg font-bold sm:text-xl">
              <CountUpNumber end={userProfileCounts.reviewCount} delay={500} />
            </p>
            <p className="text-sm">マイレビュー</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
