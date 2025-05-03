import CountUpNumber from '@/components/count-up-number';
import { getProfileCounts } from '@/lib/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

export default function ProfileCounts() {
  const { data: profileCounts } = useSuspenseQuery({
    queryKey: ['getProfileCounts'],
    queryFn: () => getProfileCounts(),
  });

  return (
    <div className="flex justify-between">
      <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-0 duration-500">
        <Link to="/favorites">
          <div className="w-24 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber end={profileCounts.favoriteCount} delay={300} />
            </p>
            <p className="text-sm">お気に入り</p>
          </div>
        </Link>
      </div>
      <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-100 duration-500">
        <Link to="/bookmarks">
          <div className="w-24 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber end={profileCounts.bookmarkCount} delay={400} />
            </p>
            <p className="text-sm">ブックマーク</p>
          </div>
        </Link>
      </div>
      <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-200 duration-500">
        <Link to="/my-reviews">
          <div className="w-24 text-center">
            <p className="text-xl font-bold">
              <CountUpNumber end={profileCounts.reviewCount} delay={500} />
            </p>
            <p className="text-sm">マイレビュー</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
